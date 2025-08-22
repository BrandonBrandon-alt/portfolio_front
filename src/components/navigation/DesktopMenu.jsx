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

  const getNavLinkClasses = ({ isActive }) => `nav-link ${isActive ? "" : ""}`;

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
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end={link.exact || false}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {link.icon}
              <span className="hidden xl:inline tracking-wider">
                {link.label.toUpperCase()}
              </span>
            </motion.span>
            <span className="nav-link-underline" />
          </NavLink>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default DesktopMenu;
