import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

/**
 * Componente de notificación para mostrar mensajes de estado, errores, etc.
 */
const Notification = ({
  type = "info",
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isShowing, setIsShowing] = useState(isVisible);

  useEffect(() => {
    setIsShowing(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (autoClose && isShowing) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isShowing, autoClose, duration]);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Tiempo para la animación de salida
  };

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-500/90",
          border: "border-red-400",
          icon: FaExclamationTriangle,
          iconColor: "text-red-200",
        };
      case "success":
        return {
          bg: "bg-green-500/90",
          border: "border-green-400",
          icon: FaCheckCircle,
          iconColor: "text-green-200",
        };
      case "warning":
        return {
          bg: "bg-yellow-500/90",
          border: "border-yellow-400",
          icon: FaExclamationTriangle,
          iconColor: "text-yellow-200",
        };
      default: // info
        return {
          bg: "bg-blue-500/90",
          border: "border-blue-400",
          icon: FaInfoCircle,
          iconColor: "text-blue-200",
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`
            fixed top-4 right-4 z-[9999] max-w-sm w-full
            ${styles.bg} ${styles.border} border
            rounded-lg shadow-2xl backdrop-blur-md
            text-white p-4
          `}
        >
          <div className="flex items-start gap-3">
            <Icon
              className={`${styles.iconColor} mt-0.5 flex-shrink-0`}
              size={18}
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-5 break-words">
                {message}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
              aria-label="Cerrar notificación"
            >
              <FaTimes size={14} className="text-white/80" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
