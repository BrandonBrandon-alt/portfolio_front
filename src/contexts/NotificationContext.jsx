import React, { createContext, useContext } from "react";
import useNotification from "../hooks/useNotification";
import Notification from "../components/ui/Notification";

/**
 * Contexto para manejar notificaciones globalmente en la aplicación
 */
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications debe ser usado dentro de NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const notificationMethods = useNotification();

  return (
    <NotificationContext.Provider value={notificationMethods}>
      {children}

      {/* Renderizar todas las notificaciones activas */}
      <div className="fixed top-0 right-0 z-[9999] p-4 space-y-2 pointer-events-none">
        {notificationMethods.notifications.map((notification, index) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              type={notification.type}
              message={notification.message}
              isVisible={true}
              onClose={() =>
                notificationMethods.removeNotification(notification.id)
              }
              autoClose={notification.autoClose}
              duration={notification.duration}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
