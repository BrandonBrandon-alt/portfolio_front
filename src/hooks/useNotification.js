import { useState, useCallback } from "react";

/**
 * Hook para manejar notificaciones de forma global
 */
const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: "info",
      autoClose: true,
      duration: 5000,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove después del duration si autoClose está habilitado
    if (newNotification.autoClose) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Métodos de conveniencia para diferentes tipos
  const showSuccess = useCallback(
    (message, options = {}) => {
      return addNotification({ ...options, type: "success", message });
    },
    [addNotification]
  );

  const showError = useCallback(
    (message, options = {}) => {
      return addNotification({
        ...options,
        type: "error",
        message,
        duration: 8000, // Los errores se muestran más tiempo por defecto
      });
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (message, options = {}) => {
      return addNotification({ ...options, type: "warning", message });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (message, options = {}) => {
      return addNotification({ ...options, type: "info", message });
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default useNotification;
