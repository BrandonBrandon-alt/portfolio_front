// navigation/NavLogo.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavLogo = () => {
  return (
    <NavLink
      to="/"
      className="text-[var(--color-accent-jedi-blue)] text-2xl font-bold flex items-center space-x-3 drop-shadow-lg"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-3"
      >
        <motion.svg
          width="45"
          height="45"
          viewBox="0 0 100 100"
          fill="none"
          className="drop-shadow-lg"
          animate={{
            filter: [
              "drop-shadow(0 0 5px var(--color-accent-jedi-blue))",
              "drop-shadow(0 0 15px var(--color-accent-jedi-green))",
              "drop-shadow(0 0 5px var(--color-accent-jedi-blue))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100">
              <stop stopColor="var(--color-accent-jedi-blue)" />
              <stop offset="0.5" stopColor="var(--color-accent-jedi-green)" />
              <stop offset="1" stopColor="var(--color-accent-jedi-blue)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z"
            fill="url(#logo-gradient)"
            filter="url(#glow)"
          />
        </motion.svg>
        <span className="leading-none font-display bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] bg-clip-text text-transparent">
          BRAN|DEV
        </span>
      </motion.div>
    </NavLink>
  );
};

export default NavLogo;
