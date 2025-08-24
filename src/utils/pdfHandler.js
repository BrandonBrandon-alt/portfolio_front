// src/utils/pdfHandler.js
import { detectDevice, getOptimalStrategy } from "./deviceDetection";

/**
 * Función principal para manejar PDFs con estrategia adaptable.
 */
export const handlePDF = (pdfUrl, options = {}) => {
  const {
    filename = "document.pdf",
    strategy = getOptimalStrategy(),
    onSuccess = null,
    onError = null,
    analytics = null,
  } = options;

  console.log(`[PDF Handler] Strategy: ${strategy}, URL: ${pdfUrl}`);

  if (!pdfUrl) {
    const err = new Error("PDF URL requerida");
    onError && onError(err);
    return { success: false, error: err };
  }

  // Analytics tracking
  if (analytics && typeof analytics.track === "function") {
    try {
      analytics.track("pdf_interaction", {
        strategy,
        filename,
        url: pdfUrl,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("[PDF Handler] Analytics error (continuing):", e);
    }
  }

  try {
    let result;
    switch (strategy) {
      case "download":
        result = downloadPDF(pdfUrl, filename);
        break;
      case "newTab":
        result = openInNewTab(pdfUrl);
        break;
      case "modal":
        result = { success: true, method: "modal", requiresModal: true };
        break;
      default:
        result = smartOpen(pdfUrl, filename);
    }

    if (result.success) onSuccess && onSuccess(result);
    else onError && onError(result.error || new Error("PDF error"));

    return result;
  } catch (error) {
    console.error("[PDF Handler] Error:", error);
    onError && onError(error);
    return { success: false, error };
  }
};

// Descarga directa ----------------------------------------------------------
const downloadPDF = (url, filename) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) document.body.removeChild(link);
    }, 120);
    return {
      success: true,
      method: "download",
      message: `Descargando ${filename}...`,
    };
  } catch (error) {
    return { success: false, error };
  }
};

// Abrir en nueva pestaña ----------------------------------------------------
const openInNewTab = (url) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return {
      success: true,
      method: "newTab",
      message: "Abriendo en nueva pestaña...",
    };
  } catch (error) {
    console.warn("[New Tab] Fallback a descarga");
    return downloadPDF(url, "document.pdf");
  }
};

// Apertura inteligente ------------------------------------------------------
const smartOpen = (url, filename) => {
  const device = detectDevice();
  if (device.isMobile) return downloadPDF(url, filename);
  const result = openInNewTab(url);
  return result.success ? result : downloadPDF(url, filename);
};
