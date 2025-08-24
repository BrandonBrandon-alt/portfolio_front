/**
 * Utilitarios para el manejo seguro de PDFs en dispositivos móviles
 */

// Detectar si estamos en un dispositivo móvil
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detectar si estamos en iOS
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Detectar si estamos en Android
export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

/**
 * Abre un PDF de forma segura, especialmente optimizado para móviles
 * @param {string} pdfUrl - URL del PDF a abrir
 * @param {string} filename - Nombre del archivo (para fallback)
 * @param {function} onError - Callback de error opcional
 * @param {function} showNotification - Función para mostrar notificaciones
 */
export const openPDFSafely = (
  pdfUrl,
  filename = "documento.pdf",
  onError,
  showNotification
) => {
  try {
    console.info(`[PDFUtils] Opening PDF: ${pdfUrl}`);

    // Verificar si el PDF existe
    if (!pdfUrl) {
      throw new Error("URL del PDF no proporcionada");
    }

    // Mostrar notificación de apertura si está disponible
    if (showNotification) {
      showNotification.showInfo("Abriendo documento...", { duration: 2000 });
    }

    // Para móviles, usar diferentes estrategias
    if (isMobile()) {
      console.info(
        "[PDFUtils] Mobile device detected, using mobile-optimized approach"
      );

      // En iOS, intentar abrir directamente en Safari
      if (isIOS()) {
        // Crear un enlace temporal y hacer click en él
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // Agregar al DOM temporalmente para iOS
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.info("[PDFUtils] PDF opened using iOS-optimized method");

        if (showNotification) {
          showNotification.showSuccess("Documento abierto correctamente", {
            duration: 3000,
          });
        }

        return true;
      }

      // Para Android y otros móviles
      const newWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");

      // Verificar si se bloqueó el popup
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        console.warn("[PDFUtils] Popup blocked, trying alternative method");

        if (showNotification) {
          showNotification.showWarning("Abriendo en la misma ventana...", {
            duration: 2000,
          });
        }

        // Fallback: navegar directamente al PDF
        window.location.href = pdfUrl;
        return true;
      }

      console.info("[PDFUtils] PDF opened in new window/tab");

      if (showNotification) {
        showNotification.showSuccess("Documento abierto en nueva pestaña", {
          duration: 3000,
        });
      }

      return true;
    }

    // Para desktop, usar el método tradicional con configuración optimizada
    const windowFeatures =
      "width=800,height=900,scrollbars=yes,resizable=yes,noopener,noreferrer";
    const newWindow = window.open(pdfUrl, "_blank", windowFeatures);

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      console.warn("[PDFUtils] Popup blocked on desktop");
      throw new Error(
        "El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio."
      );
    }

    console.info("[PDFUtils] PDF opened successfully on desktop");

    if (showNotification) {
      showNotification.showSuccess("Documento abierto en nueva ventana", {
        duration: 3000,
      });
    }

    return true;
  } catch (error) {
    console.error("[PDFUtils] Error opening PDF:", error);

    if (showNotification) {
      showNotification.showError(
        `Error al abrir el documento: ${error.message}`,
        { duration: 6000 }
      );
    }

    if (onError) {
      onError(error);
    } else {
      // Fallback genérico: mostrar alert y ofrecer descarga
      const shouldDownload = confirm(
        `No se pudo abrir el PDF directamente. ¿Deseas descargarlo?`
      );

      if (shouldDownload) {
        downloadPDF(pdfUrl, filename);

        if (showNotification) {
          showNotification.showInfo("Iniciando descarga...", {
            duration: 3000,
          });
        }
      }
    }

    return false;
  }
};

/**
 * Descarga un PDF directamente
 * @param {string} pdfUrl - URL del PDF
 * @param {string} filename - Nombre del archivo
 */
export const downloadPDF = (pdfUrl, filename = "documento.pdf") => {
  try {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.info(`[PDFUtils] PDF download initiated: ${filename}`);
  } catch (error) {
    console.error("[PDFUtils] Error downloading PDF:", error);

    // Último fallback: navegar al PDF
    window.location.href = pdfUrl;
  }
};

/**
 * Verifica si un PDF existe y es accesible
 * @param {string} pdfUrl - URL del PDF
 * @returns {Promise<boolean>} - Promise que resuelve a true si el PDF existe
 */
export const verifyPDFExists = async (pdfUrl) => {
  try {
    const response = await fetch(pdfUrl, { method: "HEAD" });
    return response.ok && response.headers.get("content-type")?.includes("pdf");
  } catch (error) {
    console.error("[PDFUtils] Error verifying PDF existence:", error);
    return false;
  }
};
