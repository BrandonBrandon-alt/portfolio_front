// src/components/ui/HolographicContainer.jsx
import React from "react";
import { motion } from "framer-motion";

const HolographicContainer = ({
  children,
  maxWidth = "7xl",
  particleCount = 22,
  gridColumns = 10,
  showGrid = true,
  showParticles = true,
  cornerVariant = "mixed", // "green", "blue", "mixed"
  className = "",
  innerPadding = "py-12 sm:py-16 md:py-20",
  ...props
}) => {
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  };

  const cornerColors = {
    green: "border-[var(--color-accent-jedi-green)]",
    blue: "border-[var(--color-accent-jedi-blue)]",
    mixed: "border-[var(--color-accent-jedi-green)]", // Default to green, can be customized per corner
  };

  const cornerColor = cornerColors[cornerVariant] || cornerColors.mixed;

  return (
    <motion.section
      className={`relative min-h-screen py-12 sm:py-16 md:py-20 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
      {...props}
    >
      {/* Fondo base + gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)]/95 to-[var(--color-background)]/90" />

      {/* Partículas animadas */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Grid holográfico (desktop) */}
      {showGrid && (
        <div className="absolute inset-0 opacity-5 hidden sm:block pointer-events-none">
          <div className={`grid grid-cols-${gridColumns} h-full`}>
            {[...Array(gridColumns)].map((_, i) => (
              <div
                key={i}
                className="border-r border-[var(--color-accent-jedi-blue)]"
              />
            ))}
          </div>
        </div>
      )}

      {/* Contenedor principal con marco holográfico */}
      <div
        className={`relative ${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 md:px-10`}
      >
        {/* Marco holográfico */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[var(--color-accent-jedi-blue)]/30 sm:border-2 bg-gradient-to-br from-[var(--color-accent-jedi-green)]/5 via-transparent to-[var(--color-accent-jedi-blue)]/5 backdrop-blur-sm">
          {/* Esquinas brillantes */}
          <div
            className={`absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-l sm:border-t-2 sm:border-l-2 ${cornerColor} rounded-tl-2xl sm:rounded-tl-3xl animate-pulse`}
          />
          <div
            className={`absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-r sm:border-t-2 sm:border-r-2 ${
              cornerVariant === "mixed"
                ? "border-[var(--color-accent-jedi-blue)]"
                : cornerColor
            } rounded-tr-2xl sm:rounded-tr-3xl animate-pulse`}
          />
          <div
            className={`absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-l sm:border-b-2 sm:border-l-2 ${cornerColor} rounded-bl-2xl sm:rounded-bl-3xl animate-pulse`}
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-r sm:border-b-2 sm:border-r-2 ${
              cornerVariant === "mixed"
                ? "border-[var(--color-accent-jedi-blue)]"
                : cornerColor
            } rounded-br-2xl sm:rounded-br-3xl animate-pulse`}
          />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(0,255,159,0.09)] sm:shadow-[0_0_60px_rgba(0,255,159,0.13)] animate-pulse" />
        </div>

        {/* Contenido interno */}
        <div className={`relative z-10 ${innerPadding}`}>{children}</div>
      </div>
    </motion.section>
  );
};

export default HolographicContainer;
