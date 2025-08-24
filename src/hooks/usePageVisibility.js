import { useState, useEffect } from "react";

/**
 * Hook para manejar la visibilidad de la página y eventos de lifecycle
 * Útil para manejar el retorno desde aplicaciones externas (como visualizadores de PDF)
 */
const usePageVisibility = (onVisibilityChange) => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [isAppActive, setIsAppActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);

      if (onVisibilityChange) {
        onVisibilityChange(visible);
      }

      // Log para debugging
      console.info(
        `[PageVisibility] Page is now ${visible ? "visible" : "hidden"}`
      );
    };

    const handleFocus = () => {
      setIsAppActive(true);
      console.info("[PageVisibility] App focused");

      // Pequeño delay para permitir que React se estabilice
      setTimeout(() => {
        if (onVisibilityChange) {
          onVisibilityChange(true);
        }
      }, 100);
    };

    const handleBlur = () => {
      setIsAppActive(false);
      console.info("[PageVisibility] App blurred");
    };

    const handlePageShow = (event) => {
      console.info("[PageVisibility] Page shown, persisted:", event.persisted);

      // Si la página viene del cache (back/forward), refrescar estado
      if (event.persisted) {
        setTimeout(() => {
          if (onVisibilityChange) {
            onVisibilityChange(true);
          }
        }, 100);
      }
    };

    const handlePageHide = () => {
      console.info("[PageVisibility] Page hidden");
    };

    // Event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [onVisibilityChange]);

  return {
    isVisible,
    isAppActive,
    isFullyActive: isVisible && isAppActive,
  };
};

export default usePageVisibility;
