// navigation/MobileMenu.jsx
import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "./navLinks";

const MobileMenu = ({ isOpen, onClose }) => {
  console.log("MobileMenu rendered, isOpen:", isOpen);

  if (!isOpen) return null;

  const getMobileNavLinkClasses = ({ isActive }) =>
    `nav-link-mobile ${isActive ? "" : ""}`;

  const location = useLocation();
  const firstLinkRef = useRef(null);

  // Cerrar automáticamente al cambiar la ruta
  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Enfoque inicial para accesibilidad
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="block sm:block md:block lg:hidden xl:hidden">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Menu Panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-full max-w-sm nav-panel shadow-2xl overflow-y-auto"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--color-accent-jedi-blue)]/30">
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Navegación
              </motion.h2>

              <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                aria-label="Cerrar menú"
                onClick={onClose}
                className="p-2 rounded-full border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-200"
              >
                <HiXMark className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4" aria-label="Navegación principal móvil">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={link.to}
                    ref={index === 0 ? firstLinkRef : null}
                    className={({ isActive }) =>
                      `nav-link-mobile ${isActive ? "active" : ""}`
                    }
                    onClick={onClose}
                    end={link.exact || false}
                  >
                    <motion.span
                      className="flex items-center gap-3 w-full"
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 24,
                      }}
                    >
                      <motion.span
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 14,
                        }}
                      >
                        {link.icon}
                      </motion.span>
                      <span className="flex-1 tracking-wider font-mono">
                        {link.label.toUpperCase()}
                      </span>
                      <span className="nav-link-mobile-underline" />
                    </motion.span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              className="mt-12 pt-6 border-t border-[var(--color-accent-jedi-blue)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center font-mono text-xs tracking-wider text-[var(--color-text-primary)]/50">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  [ NAV_CHANNEL_READY ]
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
