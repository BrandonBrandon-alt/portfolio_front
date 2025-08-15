// navigation/DesktopMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "./navLinks";

const DesktopMenu = () => {
  const navListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const navListItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const getNavLinkClasses = ({ isActive }) => {
    const base =
      "inline-flex items-center justify-center font-sans font-bold py-3 px-6 rounded-lg transition-all duration-300 text-base relative overflow-hidden group";
    const inactive =
      "border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] hover:border-[var(--color-accent-jedi-green)] shadow-[0_0_15px_rgba(0,150,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,150,0.5)] transform hover:scale-105";
    const active =
      'bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] text-[var(--color-background)] shadow-[0_0_25px_rgba(0,150,255,0.5)] border-2 border-white/30 scale-105 after:content-[""] after:absolute after:inset-0 after:bg-white/10 after:rounded-lg';

    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <motion.ul
      className="hidden lg:flex items-center space-x-2 xl:space-x-4"
      variants={navListContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {navLinks.map((link, index) => (
        <motion.li
          key={link.to}
          variants={navListItemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink
            to={link.to}
            className={getNavLinkClasses}
            end={link.exact || false}
          >
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {link.icon}
              <span className="hidden xl:inline">{link.label}</span>
            </motion.div>
            {/* Efecto de partículas en hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </NavLink>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default DesktopMenu;
