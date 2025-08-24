/**
 * Utilidades SINCRONAS para abrir/descargar PDFs minimizando bloqueos de popup.
 * Versión optimizada con mejor detección de dispositivos y estrategias más robustas.
 */

// Detecciones de dispositivos optimizadas
export const isMobile = () => {
  // Detección más robusta incluyendo touch y viewport
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth <= 768
  );
};

export const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ); // iPad en modo desktop
};

export const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const isChrome = () => {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
};

/**
 * Valida si una URL es válida y accesible
 */
function isValidURL(url) {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);
    return ["http:", "https:", "blob:", "data:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Detecta si los popups están bloqueados
 */
function detectPopupBlocker() {
  try {
    const testWindow = window.open(
      "about:blank",
      "_blank",
      "width=1,height=1,left=-1000,top=-1000,noopener,noreferrer"
    );
    if (
      !testWindow ||
      testWindow.closed ||
      typeof testWindow.closed === "undefined"
    ) {
      return true; // Bloqueado
    }
    // Dar tiempo para que se establezca la ventana
    setTimeout(() => {
      if (testWindow && !testWindow.closed) {
        testWindow.close();
      }
    }, 100);
    return false; // No bloqueado
  } catch {
    return true; // Bloqueado por error
  }
}

/**
 * Estrategia de apertura optimizada con mejor detección de fallos.
 * Devuelve objeto con { success: boolean, newTab: boolean, method: string, error?: string }.
 */
export function openPDFSafely(pdfUrl, options = {}) {
  const {
    filename = "documento.pdf",
    forceDownload = false,
    timeout = 1000,
    skipConfirmation = false,
  } = options;

  const result = {
    success: false,
    newTab: false,
    method: "none",
    error: null,
  };

  try {
    // Validaciones iniciales
    if (!isValidURL(pdfUrl)) {
      throw new Error("URL PDF inválida o vacía");
    }

    console.log("[openPDFSafely] Intentando abrir PDF:", pdfUrl);

    // En dispositivos móviles, especialmente iOS, preferir descarga directa
    if (forceDownload || (isMobile() && isIOS())) {
      console.log("[openPDFSafely] Forzando descarga en móvil");
      downloadPDF(pdfUrl, filename);
      result.success = true;
      result.method = "mobileDownload";
      return result;
    }

    // Estrategia 1: window.open directo (más confiable para PDFs)
    console.log("[openPDFSafely] Intentando window.open directo");
    try {
      const directWindow = window.open(
        pdfUrl,
        "_blank",
        "noopener,noreferrer,scrollbars=yes,resizable=yes,width=1200,height=800"
      );

      // Verificar inmediatamente si la ventana se abrió
      if (
        directWindow &&
        !directWindow.closed &&
        directWindow.location !== null
      ) {
        console.log("[openPDFSafely] window.open directo exitoso");
        result.success = true;
        result.newTab = true;
        result.method = "windowOpenDirect";
        return result;
      } else {
        console.log(
          "[openPDFSafely] window.open directo falló - ventana bloqueada o cerrada"
        );
        if (directWindow) {
          directWindow.close();
        }
      }
    } catch (e) {
      console.warn("[openPDFSafely] Error en window.open directo:", e.message);
    }

    // Estrategia 2: Elemento anchor con click programático (más compatible)
    console.log("[openPDFSafely] Intentando anchor click");
    try {
      const anchor = document.createElement("a");
      anchor.href = pdfUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.style.cssText =
        "position:absolute;left:-9999px;opacity:0;pointer-events:none";

      document.body.appendChild(anchor);

      // Click directo (más confiable que dispatchEvent)
      anchor.click();

      // Cleanup inmediato
      document.body.removeChild(anchor);

      // Verificar usando focus y visibility
      let success = false;

      // Método 1: Check de focus después de un delay mínimo
      setTimeout(() => {
        if (!document.hasFocus() || document.hidden) {
          success = true;
          console.log(
            "[openPDFSafely] Anchor click probablemente exitoso (perdió foco)"
          );
        }
      }, 100);

      // Dar un poco más de tiempo para verificar
      setTimeout(() => {
        if (success) {
          result.success = true;
          result.newTab = true;
          result.method = "anchorClick";
        }
      }, 200);

      // Asumir éxito optimista para anchor click
      result.success = true;
      result.newTab = true;
      result.method = "anchorClickOptimistic";
      return result;
    } catch (e) {
      console.warn("[openPDFSafely] Error en anchor click:", e.message);
    }

    // Estrategia 3: Ventana en blanco como último recurso para nueva pestaña
    console.log("[openPDFSafely] Intentando ventana en blanco");
    try {
      const blankWindow = window.open(
        "about:blank",
        "_blank",
        "noopener,noreferrer,width=1200,height=800"
      );
      if (blankWindow && !blankWindow.closed) {
        // Asignar URL después de un micro-delay
        setTimeout(() => {
          try {
            blankWindow.location.href = pdfUrl;
            console.log("[openPDFSafely] Ventana en blanco exitosa");
          } catch (e) {
            console.warn(
              "[openPDFSafely] Error asignando URL a ventana en blanco:",
              e.message
            );
            blankWindow.close();
          }
        }, 50);

        result.success = true;
        result.newTab = true;
        result.method = "windowOpenBlank";
        return result;
      }
    } catch (e) {
      console.warn("[openPDFSafely] Error en ventana en blanco:", e.message);
    }

    // Si llegamos aquí, todas las estrategias fallaron
    console.warn(
      "[openPDFSafely] Todas las estrategias de nueva pestaña fallaron"
    );

    // Último recurso: descargar en lugar de confirmar navegación
    if (!skipConfirmation) {
      console.log("[openPDFSafely] Intentando descarga como fallback");
      downloadPDF(pdfUrl, filename);
      result.success = true;
      result.newTab = false;
      result.method = "downloadFallback";
      return result;
    }
  } catch (err) {
    console.error("[openPDFSafely] Error crítico:", err);
    result.error = err.message;

    // Fallback final: solo si no se puede descargar
    if (!skipConfirmation) {
      try {
        downloadPDF(pdfUrl, filename);
        result.success = true;
        result.newTab = false;
        result.method = "errorDownload";
        return result;
      } catch (downloadError) {
        console.error(
          "[openPDFSafely] También falló la descarga:",
          downloadError
        );
        result.method = "allMethodsFailed";
        result.error = `${result.error}; Download: ${downloadError.message}`;
      }
    }
  }

  return result;
}

/**
 * Descarga directa optimizada con mejor manejo de errores
 */
export function downloadPDF(pdfUrl, filename = "documento.pdf", options = {}) {
  const { showProgress = false, onError = null } = options;

  try {
    // Validar URL
    if (!isValidURL(pdfUrl)) {
      throw new Error("URL inválida para descarga");
    }

    // Limpiar filename de caracteres problemáticos
    const cleanFilename = filename.replace(/[<>:"/\\|?*]/g, "_");

    // Crear elemento de descarga
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = cleanFilename;
    anchor.style.cssText =
      "position:absolute;left:-9999px;opacity:0;pointer-events:none";

    // Para URLs de blob o data, el download funciona directamente
    if (pdfUrl.startsWith("blob:") || pdfUrl.startsWith("data:")) {
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return { success: true, method: "directDownload" };
    }

    // Para URLs externas, intentar fetch primero si es posible (mismo origen)
    try {
      const url = new URL(pdfUrl);
      if (url.origin === window.location.origin) {
        // Mismo origen - podemos usar fetch
        fetch(pdfUrl)
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.blob();
          })
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            anchor.href = blobUrl;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);

            // Limpiar blob URL después de un delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
          })
          .catch((err) => {
            console.warn(
              "[downloadPDF] Fetch falló, usando método directo:",
              err.message
            );
            // Fallback al método directo
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
          });
      } else {
        // Diferente origen - método directo
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

      return { success: true, method: "anchorDownload" };
    } catch (fetchError) {
      // Fallback al método simple
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return { success: true, method: "fallbackDownload" };
    }
  } catch (error) {
    console.error("[downloadPDF] Error en descarga:", error);

    if (onError && typeof onError === "function") {
      onError(error);
    }

    // Último recurso: navegar a la URL
    try {
      window.location.href = pdfUrl;
      return { success: true, method: "navigationFallback" };
    } catch (navError) {
      console.error("[downloadPDF] También falló la navegación:", navError);
      return {
        success: false,
        method: "failed",
        error: `${error.message}; Navigation: ${navError.message}`,
      };
    }
  }
}

/**
 * Función de utilidad que combina apertura y descarga según contexto
 */
export function handlePDF(pdfUrl, options = {}) {
  const {
    preferDownload = isMobile(),
    filename = "documento.pdf",
    showFeedback = true,
    onComplete = null,
    allowSameTab = false,
  } = options;

  console.log("[handlePDF] Iniciando manejo de PDF:", {
    pdfUrl,
    preferDownload,
    isMobile: isMobile(),
    filename,
  });

  let result;

  if (preferDownload) {
    console.log("[handlePDF] Prefiriendo descarga");
    result = downloadPDF(pdfUrl, filename, options);
    result.action = "download";
  } else {
    console.log("[handlePDF] Intentando apertura en nueva pestaña");
    result = openPDFSafely(pdfUrl, {
      ...options,
      skipConfirmation: !allowSameTab,
    });
    result.action = "open";

    // Si falló y no se permite same tab, intentar descarga
    if (!result.success && !allowSameTab) {
      console.log("[handlePDF] Apertura falló, intentando descarga");
      result = downloadPDF(pdfUrl, filename, options);
      result.action = "download_fallback";
    }
  }

  if (showFeedback) {
    if (result.success) {
      console.log(`[handlePDF] PDF ${result.action} exitoso:`, result.method);
    } else {
      console.warn(
        `[handlePDF] PDF ${result.action} falló:`,
        result.error || "Método desconocido"
      );
    }
  }

  if (onComplete && typeof onComplete === "function") {
    onComplete(result);
  }

  return result;
}
