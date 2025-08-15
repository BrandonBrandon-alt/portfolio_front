// navigation/MobileMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { navLinks } from "./navLinks";

const MobileMenu = ({ isOpen, onClose }) => {
  console.log("MobileMenu rendered, isOpen:", isOpen);

  if (!isOpen) return null;

  const getMobileNavLinkClasses = ({ isActive }) => {
    const base =
      "flex items-center py-4 px-4 rounded-xl text-lg font-semibold transition-all duration-300 border-2 w-full";
    const inactive =
      "text-[var(--color-text-primary)] border-[var(--color-accent-jedi-blue)]/30 hover:text-[var(--color-accent-jedi-blue)] hover:bg-gradient-to-r hover:from-[var(--color-accent-jedi-blue)]/10 hover:to-[var(--color-accent-jedi-green)]/10 hover:border-[var(--color-accent-jedi-blue)] transform hover:scale-[1.02]";
    const active =
      "text-[var(--color-background)] bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] border-[var(--color-accent-jedi-green)] scale-[1.02]";

    return `${base} ${isActive ? active : inactive}`;
  };

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
          className="absolute right-0 top-0 h-full w-full max-w-sm bg-[var(--color-background)] shadow-2xl overflow-y-auto border-l-2 border-[var(--color-accent-jedi-blue)]/30"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `linear-gradient(135deg, 
              var(--color-background) 0%, 
              var(--color-background) 70%, 
              rgba(0, 150, 255, 0.05) 100%)`,
          }}
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
            <nav className="space-y-3">
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
                    className={getMobileNavLinkClasses}
                    onClick={onClose}
                    end={link.exact || false}
                  >
                    <motion.div
                      className="flex items-center w-full"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {link.icon}
                      </motion.div>
                      <span className="flex-1">{link.label}</span>
                      <motion.div
                        className="w-2 h-2 bg-[var(--color-accent-jedi-blue)] rounded-full opacity-70"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
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
              <div className="text-center">
                <motion.p
                  className="text-sm text-[var(--color-text-secondary)] opacity-60"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✨ Desarrollado con pasión ✨
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
