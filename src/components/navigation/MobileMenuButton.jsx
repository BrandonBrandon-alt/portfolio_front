// navigation/MobileMenuButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";

const MobileMenuButton = ({ isOpen, onClick }) => {
  console.log("MobileMenuButton rendered, isOpen:", isOpen);

  const handleClick = () => {
    console.log(
      "Button clicked, current state:",
      isOpen,
      "-> will toggle to:",
      !isOpen
    );
    onClick();
  };

  return (
    <div className="block sm:block md:block lg:hidden xl:hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="relative z-50 p-3 nav-mobile-btn text-[var(--color-accent-jedi-blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={handleClick}
        type="button"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "tween",
          }}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{ position: isOpen ? "absolute" : "relative" }}
          >
            <HiBars3 className="h-6 w-6" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            style={{ position: isOpen ? "relative" : "absolute" }}
          >
            <HiXMark className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default MobileMenuButton;
