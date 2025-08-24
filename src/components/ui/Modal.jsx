// src/components/ui/Modal.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children, title, size = "medium" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  const sizeClasses = {
    small: "max-w-sm sm:max-w-md",
    medium: "max-w-lg sm:max-w-xl lg:max-w-2xl",
    large: "max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl",
    full: "max-w-2xl sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-4 lg:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative w-full ${sizeClasses[size]} bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)]/95 to-[var(--color-background)]/90 rounded-xl sm:rounded-2xl border border-[var(--color-accent-jedi-blue)]/30 shadow-[0_0_40px_-8px_rgba(0,255,159,0.3)] backdrop-blur-xl overflow-hidden`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Holographic corners */}
            <span className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-t border-l border-[var(--color-accent-jedi-green)] rounded-tl-xl sm:rounded-tl-2xl animate-pulse" />
            <span className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-t border-r border-[var(--color-accent-jedi-green)] rounded-tr-xl sm:rounded-tr-2xl animate-pulse" />
            <span className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-b border-l border-[var(--color-accent-jedi-green)]/60 rounded-bl-xl sm:rounded-bl-2xl animate-pulse" />
            <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-b border-r border-[var(--color-accent-jedi-green)]/60 rounded-br-xl sm:rounded-br-2xl animate-pulse" />

            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none hidden sm:block"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {title && (
              <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-white/10 bg-gradient-to-r from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[var(--color-text-primary)] font-mono tracking-wide">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[var(--color-accent-jedi-blue)]/40 group"
                >
                  <FaTimes className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-text-primary)]/70 group-hover:text-[var(--color-accent-jedi-blue)] transition-colors" />
                </button>
              </div>
            )}
            <div className="p-4 sm:p-5 lg:p-6 max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-[var(--color-accent-jedi-blue)]/30 hover:scrollbar-thumb-[var(--color-accent-jedi-blue)]/50">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
