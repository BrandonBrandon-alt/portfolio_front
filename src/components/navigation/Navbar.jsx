// navigation/Navbar.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLogo from "./NavLogo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bloquear scroll cuando el menú móvil esté abierto
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMenuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 },
    },
  };

  const toggleMenu = useCallback(() => {
    console.log("Toggle menu - current state:", isMenuOpen);
    setIsMenuOpen((prev) => !prev);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    console.log("Close menu called");
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        className="nav-holo text-[var(--color-text-primary)] py-3"
        data-scan="on"
        initial="hidden"
        animate="visible"
        variants={navVariants}
        aria-label="Navegación principal"
      >
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-6 relative">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Menu */}
          <DesktopMenu />

          {/* Mobile Menu Button */}
          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </motion.nav>

      {/* Mobile Menu - CORREGIDO: AnimatePresence debe envolver solo el contenido condicional */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MobileMenu
            key="mobile-menu"
            isOpen={isMenuOpen}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
