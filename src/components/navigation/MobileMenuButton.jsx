// navigation/MobileMenuButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";

const MobileMenuButton = ({ isOpen, onClick }) => {
  console.log("MobileMenuButton rendered, isOpen:", isOpen);

  return (
    <div className="block sm:block md:block lg:hidden xl:hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="relative z-50 p-3 nav-mobile-btn text-[var(--color-accent-jedi-blue)]"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => {
          console.log("Button clicked, current state:", isOpen);
          onClick();
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isOpen ? (
            <HiXMark className="h-6 w-6" />
          ) : (
            <HiBars3 className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default MobileMenuButton;
