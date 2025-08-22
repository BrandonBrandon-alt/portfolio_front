// navigation/MobileMenu.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "./navLinks";

const MobileMenu = ({ isOpen, onClose }) => {
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

  const panelRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Focus trap & keyboard handling
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"], [role="button"]'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Cerrar al cambiar a viewport grande (sin botón visible)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) onClose?.(); // lg breakpoint
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  // Swipe right para cerrar en móviles
  const touchData = useRef({ startX: 0, startY: 0, active: false });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchData.current = { startX: t.clientX, startY: t.clientY, active: true };
  };
  const onTouchMove = (e) => {
    if (!touchData.current.active) return;
    const t = e.touches[0];
    const dx = t.clientX - touchData.current.startX;
    const dy = Math.abs(t.clientY - touchData.current.startY);
    // deslizar principalmente horizontal y suficiente distancia
    if (dx > 80 && dy < 60) {
      touchData.current.active = false;
      onClose?.();
    }
  };
  const onTouchEnd = () => {
    touchData.current.active = false;
  };

  // Variants adaptados a reduced motion
  const backdropVariants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const panelVariants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { x: "100%", opacity: 0 },
        animate: { x: "0%", opacity: 1 },
        exit: { x: "100%", opacity: 0 },
      };

  const closeAndStop = useCallback((e) => {
    e.stopPropagation();
    onClose?.();
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" // full overlay
        {...backdropVariants}
        onClick={onClose}
      />
      {/* Menu Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-heading"
        className="absolute right-0 top-0 h-full w-full sm:max-w-[22rem] md:max-w-sm nav-panel shadow-2xl overflow-y-auto overscroll-contain flex flex-col bg-[var(--color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/80 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="p-6 flex-1 flex flex-col min-h-0">
          {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-accent-jedi-blue)]/30">
              <motion.h2
                id="mobile-menu-heading"
                className="text-2xl font-bold bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] bg-clip-text text-transparent"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                Navegación
              </motion.h2>

              <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                aria-label="Cerrar menú"
                onClick={closeAndStop}
                className="p-2 rounded-full border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]"
              >
                <HiXMark className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4 flex-1 overflow-y-auto pr-1" aria-label="Navegación principal móvil">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : index * 0.07 + 0.25,
                    type: prefersReducedMotion ? "tween" : "spring",
                    stiffness: 300,
                    damping: 26,
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
                      whileHover={!prefersReducedMotion ? { x: 4 } : undefined}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 24,
                      }}
                    >
                      <motion.span
                        whileHover={!prefersReducedMotion ? { scale: 1.15, rotate: 8 } : undefined}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 14,
                        }}
                      >
                        {link.icon}
                      </motion.span>
                      <span className="flex-1 tracking-wider font-mono text-sm sm:text-base">
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
              className="mt-8 pt-5 border-t border-[var(--color-accent-jedi-blue)]/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0.3 : 0.7 }}
            >
              <div className="text-center font-mono text-[10px] sm:text-xs tracking-wider text-[var(--color-text-primary)]/50">
                <motion.p
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                  transition={prefersReducedMotion ? { duration: 0.6 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  [ NAV_CHANNEL_READY ]
                </motion.p>
              </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
