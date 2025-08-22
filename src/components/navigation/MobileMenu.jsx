// navigation/MobileMenu.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "./navLinks";

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const firstLinkRef = useRef(null);
  const panelRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Cerrar automáticamente al cambiar la ruta
  useEffect(() => {
    console.log("Route changed, closing menu");
    onClose?.();
  }, [location.pathname, onClose]);

  // Enfoque inicial para accesibilidad
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus trap & keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        console.log("Escape pressed, closing menu");
        onClose?.();
        return;
      }

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

  // Cerrar al cambiar a viewport grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        console.log("Viewport changed to desktop, closing menu");
        onClose?.();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  // Swipe para cerrar
  const touchData = useRef({ startX: 0, startY: 0, active: false });

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchData.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      active: true,
    };
  }, []);

  const onTouchMove = useCallback(
    (e) => {
      if (!touchData.current.active) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchData.current.startX;
      const deltaY = Math.abs(touch.clientY - touchData.current.startY);

      // Swipe derecha para cerrar
      if (deltaX > 50 && deltaY < 100) {
        touchData.current.active = false;
        console.log("Swipe detected, closing menu");
        onClose?.();
      }
    },
    [onClose]
  );

  const onTouchEnd = useCallback(() => {
    touchData.current.active = false;
  }, []);

  // Cerrar y detener propagación
  const closeAndStop = useCallback(
    (e) => {
      e.stopPropagation();
      console.log("Close button clicked");
      onClose?.();
    },
    [onClose]
  );

  // Manejar click en backdrop
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        console.log("Backdrop clicked, closing menu");
        onClose?.();
      }
    },
    [onClose]
  );

  // Variants de animación
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { x: "100%", opacity: 0 },
        animate: { x: "0%", opacity: 1 },
        exit: { x: "100%", opacity: 0 },
      };

  const transition = prefersReducedMotion
    ? { duration: 0.2 }
    : { type: "spring", stiffness: 300, damping: 30 };

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        variants={backdropVariants}
        transition={transition}
        onClick={handleBackdropClick}
      />

      {/* Menu Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-heading"
        className="absolute right-0 top-0 h-full w-full sm:max-w-[22rem] md:max-w-sm nav-panel shadow-2xl overflow-y-auto overscroll-contain flex flex-col bg-[var(--color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/80 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        variants={panelVariants}
        transition={transition}
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
              initial={
                prefersReducedMotion ? { opacity: 0 } : { x: -20, opacity: 0 }
              }
              animate={
                prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }
              }
              transition={{ delay: 0.15 }}
            >
              Navegación
            </motion.h2>

            <motion.button
              whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
              initial={
                prefersReducedMotion ? { opacity: 0 } : { x: 20, opacity: 0 }
              }
              animate={
                prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }
              }
              transition={{ delay: 0.15 }}
              aria-label="Cerrar menú"
              onClick={closeAndStop}
              className="p-2 rounded-full border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]"
            >
              <HiXMark className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav
            className="space-y-4 flex-1 overflow-y-auto pr-1"
            aria-label="Navegación principal móvil"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { x: 40, opacity: 0 }
                }
                animate={
                  prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }
                }
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.07 + 0.25,
                  type: prefersReducedMotion ? "tween" : "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <NavLink
                  to={link.to}
                  ref={index === 0 ? firstLinkRef : null}
                  className={({ isActive }) =>
                    `nav-link-mobile ${isActive ? "active" : ""}`
                  }
                  onClick={() => {
                    console.log("Nav link clicked:", link.to);
                    onClose?.();
                  }}
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
                      whileHover={
                        !prefersReducedMotion
                          ? { scale: 1.15, rotate: 8 }
                          : undefined
                      }
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 14,
                      }}
                    >
                      {/* Remover el mr-3 del icono ya que estamos usando gap-3 */}
                      {React.cloneElement(link.icon, {
                        className: link.icon.props.className.replace(
                          " mr-3",
                          ""
                        ),
                      })}
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
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: [0.5, 1, 0.5] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.6 }
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                [ NAV_CHANNEL_READY ]
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
