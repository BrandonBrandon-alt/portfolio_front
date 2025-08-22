// navigation/Navbar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLogo from "./NavLogo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debug para verificar el estado
  console.log("Navbar - Menu open:", isMenuOpen);

  // Bloquear scroll cuando el menú móvil esté abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
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

  const toggleMenu = () => {
    console.log("Toggling menu from:", isMenuOpen, "to:", !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    console.log("Closing menu");
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="nav-holo text-[var(--color-text-primary)] py-3"
        data-scan="on"
        initial="hidden"
        animate="visible"
        variants={navVariants}
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

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        <MobileMenu key="mobile-menu" isOpen={isMenuOpen} onClose={closeMenu} />
      </AnimatePresence>
    </>
  );
};

export default Navbar;
