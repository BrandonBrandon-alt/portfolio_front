import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Button from "../ui/Button.jsx";

const Carousel = ({ slides }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
        setIsMobile(window.innerWidth < 768);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      setCurrentIndex(index);
      x.set(-index * slideWidth, {
        transition: { type: "spring", stiffness: 200, damping: 30 },
      });
    }
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(nextIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length, isPlaying]);

  return (
    <motion.section
      className="relative py-16 md:py-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
    >
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)]/95 to-[var(--color-background)]/90">
        {/* Partículas de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent-jedi-blue)] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Grid de líneas holográficas */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="border-r border-[var(--color-accent-jedi-green)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contenedor principal con bordes holográficos */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Marco holográfico */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-jedi-green)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5 backdrop-blur-sm">
          {/* Esquinas brillantes */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent-jedi-blue)] rounded-tl-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent-jedi-blue)] rounded-tr-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent-jedi-blue)] rounded-bl-2xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent-jedi-blue)] rounded-br-2xl animate-pulse" />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-pulse" />
        </div>

        {/* Contenido del carousel */}
        <div className="relative z-10 min-h-[450px] flex items-center py-12">
          <motion.div
            ref={carouselRef}
            className="flex cursor-grab items-center w-full"
            whileTap={{ cursor: "grabbing" }}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            style={{ x }}
            onDragEnd={(event, info) => {
              const velocity = info.velocity.x;
              const currentOffset = x.get();
              const slideWidth = carouselRef.current.offsetWidth;
              let targetIndex = currentIndex;

              if (velocity < -500) {
                targetIndex = Math.min(slides.length - 1, currentIndex + 1);
              } else if (velocity > 500) {
                targetIndex = Math.max(0, currentIndex - 1);
              } else {
                targetIndex = Math.round(currentOffset / -slideWidth);
                targetIndex = Math.max(
                  0,
                  Math.min(slides.length - 1, targetIndex)
                );
              }
              goToSlide(targetIndex);
              setIsPlaying(false);
              setTimeout(() => setIsPlaying(true), 3000);
            }}
          >
            <AnimatePresence>
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full text-center relative"
                  style={{ zIndex: index === currentIndex ? 2 : 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0.7,
                    scale: index === currentIndex ? 1 : 0.95,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="px-8 md:px-16">
                    {/* Número de slide con estilo cyberpunk */}
                    <motion.div
                      className="mb-6 flex justify-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-xs font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-3 py-1 rounded-full border border-[var(--color-accent-jedi-green)]/30">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </motion.div>

                    {/* Título holográfico */}
                    <motion.h2
                      className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] via-[var(--color-text-primary)] to-[var(--color-accent-jedi-green)] mb-8 relative"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      {slide.title}
                      {/* Efecto de underline holográfico */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ delay: 0.8, duration: 1 }}
                      />
                    </motion.h2>

                    {/* Descripción con animación de typewriter */}
                    <motion.div
                      className="relative mb-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-lg md:text-xl font-sans text-[var(--color-text-primary)]/90 leading-relaxed max-w-3xl mx-auto">
                        {slide.description}
                      </p>
                      {/* Cursor parpadeante */}
                      <motion.span
                        className="inline-block w-0.5 h-6 bg-[var(--color-accent-jedi-green)] ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Botones rediseñados */}
                    <motion.div
                      className="flex flex-col sm:flex-row justify-center gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {slide.button && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            as={slide.button.as || "button"}
                            href={slide.button.href}
                            onClick={slide.button.onClick}
                            className="group relative overflow-hidden font-mono font-bold py-4 px-8 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
                          >
                            <span className="relative z-10">
                              {slide.button.text}
                            </span>
                            {/* Efecto de barrido */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </Button>
                        </motion.div>
                      )}
                      {slide.secondaryButton && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {slide.secondaryButton.component ? (
                            <div className="group relative overflow-hidden font-mono font-bold py-0 px-0 rounded-lg">
                              {/** Render custom component */}
                              <slide.secondaryButton.component
                                {...(slide.secondaryButton.props || {})}
                              />
                            </div>
                          ) : (
                            <Button
                              as={slide.secondaryButton.as || "button"}
                              href={slide.secondaryButton.href}
                              onClick={slide.secondaryButton.onClick}
                              className="group relative overflow-hidden font-mono font-bold py-4 px-8 border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_20px_rgba(0,255,159,0.3)] hover:shadow-[0_0_40px_rgba(0,255,159,0.6)]"
                            >
                              <span className="relative z-10">
                                {slide.secondaryButton.text}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Controles de navegación rediseñados */}
      {!isMobile && (
        <>
          {/* Botón anterior con diseño holográfico */}
          <motion.button
            onClick={goToPrev}
            className="absolute top-1/2 left-8 transform -translate-y-1/2 group z-30"
            aria-label="Anterior"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-14 h-14 rounded-full border-2 border-[var(--color-accent-jedi-blue)]/50 bg-[var(--color-background)]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-[var(--color-accent-jedi-blue)] group-hover:bg-[var(--color-accent-jedi-blue)]/20 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <svg
                className="w-6 h-6 text-[var(--color-accent-jedi-blue)] group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {/* Círculo de glow interno */}
              <div className="absolute inset-2 rounded-full bg-[var(--color-accent-jedi-blue)]/0 group-hover:bg-[var(--color-accent-jedi-blue)]/10 transition-all duration-300" />
            </div>
          </motion.button>

          {/* Botón siguiente con diseño holográfico */}
          <motion.button
            onClick={goToNext}
            className="absolute top-1/2 right-8 transform -translate-y-1/2 group z-30"
            aria-label="Siguiente"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-14 h-14 rounded-full border-2 border-[var(--color-accent-jedi-blue)]/50 bg-[var(--color-background)]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-[var(--color-accent-jedi-blue)] group-hover:bg-[var(--color-accent-jedi-blue)]/20 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <svg
                className="w-6 h-6 text-[var(--color-accent-jedi-blue)] group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {/* Círculo de glow interno */}
              <div className="absolute inset-2 rounded-full bg-[var(--color-accent-jedi-blue)]/0 group-hover:bg-[var(--color-accent-jedi-blue)]/10 transition-all duration-300" />
            </div>
          </motion.button>

          {/* Control de play/pause */}
          <motion.button
            onClick={togglePlayPause}
            className="absolute top-8 right-8 group z-30"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-12 h-12 rounded-full border border-[var(--color-accent-jedi-green)]/50 bg-[var(--color-background)]/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-[var(--color-accent-jedi-green)] group-hover:bg-[var(--color-accent-jedi-green)]/10">
              {isPlaying ? (
                <svg
                  className="w-5 h-5 text-[var(--color-accent-jedi-green)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-[var(--color-accent-jedi-green)] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </motion.button>
        </>
      )}

      {/* Indicadores holográficos */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
        <div className="flex items-center space-x-4 bg-[var(--color-background)]/40 backdrop-blur-md rounded-full px-6 py-3 border border-[var(--color-accent-jedi-green)]/30">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group focus:outline-none"
              aria-label={`Ir al slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <div
                className={`w-3 h-3 rounded-full border transition-all duration-500 ${
                  index === currentIndex
                    ? "border-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                    : "border-[var(--color-accent-jedi-green)]/50 bg-transparent hover:border-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)]/30"
                }`}
              />
              {/* Anillo de progreso para slide activo */}
              {index === currentIndex && isPlaying && (
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full border-2 border-[var(--color-accent-jedi-blue)]/50"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}

          {/* Separador */}
          <div className="w-px h-4 bg-[var(--color-accent-jedi-green)]/30" />

          {/* Contador de slides */}
          <span className="text-xs font-mono text-[var(--color-accent-jedi-green)] tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Indicador de swipe para móvil con diseño cyberpunk */}
      {isMobile && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[var(--color-background)]/60 backdrop-blur-sm rounded-full border border-[var(--color-accent-jedi-green)]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.svg
            className="w-4 h-4 text-[var(--color-accent-jedi-green)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </motion.svg>
          <span className="text-xs font-mono text-[var(--color-accent-jedi-green)] tracking-wider">
            DESLIZA
          </span>
          <motion.svg
            className="w-4 h-4 text-[var(--color-accent-jedi-green)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Efecto de escaneo holográfico */}
      {/* Overlay global sustituye este efecto local */}
    </motion.section>
  );
};

export default Carousel;
