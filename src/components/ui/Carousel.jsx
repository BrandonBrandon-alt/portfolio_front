import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Button from './Button.jsx'; // Asegúrate de que Button esté disponible

const Carousel = ({ slides }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        setIsMobile(window.innerWidth < 768);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      setCurrentIndex(index);
      x.set(-index * slideWidth, {
        transition: { type: "spring", stiffness: 200, damping: 30 }
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

  useEffect(() => {
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto overflow-hidden section-card-style"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
    >
      {/* Container principal del carousel */}
      <div className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        
        <motion.div
          ref={carouselRef}
          className="flex cursor-grab items-center h-full"
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
              targetIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));
            }
            goToSlide(targetIndex);
          }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full flex flex-col items-center justify-center text-center"
              style={{
                zIndex: index === currentIndex ? 2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-2 sm:px-4 md:px-6 lg:px-8">
                {/* Título responsivo */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display mb-4 sm:mb-5 md:mb-6 lg:mb-8 lightsaber-underline leading-tight">
                  {slide.title}
                </h2>
                
                {/* Descripción responsiva */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-sans text-[var(--color-text-primary)] mb-6 sm:mb-7 md:mb-8 lg:mb-10 leading-relaxed max-w-prose mx-auto">
                  {slide.description}
                </p>
                
                {/* Botones responsivos */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                  {slide.button && (
                    <Button
                      as={slide.button.as || 'button'}
                      href={slide.button.href}
                      onClick={slide.button.onClick}
                      className={`${slide.button.className} w-full sm:w-auto min-w-[160px] md:min-w-[180px] lg:min-w-[200px] text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4`}
                    >
                      {slide.button.text}
                    </Button>
                  )}
                  {slide.secondaryButton && (
                    <Button
                      as={slide.secondaryButton.as || 'button'}
                      href={slide.secondaryButton.href}
                      onClick={slide.secondaryButton.onClick}
                      className={`${slide.secondaryButton.className} w-full sm:w-auto min-w-[160px] md:min-w-[180px] lg:min-w-[200px] text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4`}
                    >
                      {slide.secondaryButton.text}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botones de navegación - Solo en desktop */}
        {!isMobile && (
          <>
            <motion.button
              onClick={goToPrev}
              className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 bg-[var(--color-accent-jedi-blue)]/20 backdrop-blur-md text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-300 z-20 hover:scale-105"
              aria-label="Anterior"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={goToNext}
              className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 bg-[var(--color-accent-jedi-blue)]/20 backdrop-blur-md text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-300 z-20 hover:scale-105"
              aria-label="Siguiente"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        {/* Indicadores responsivos */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-20">
          <div className="flex space-x-2 sm:space-x-3 md:space-x-4 bg-black/20 backdrop-blur-sm rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 border-[var(--color-accent-jedi-blue)] shadow-sm transition-all duration-300 focus:outline-none ${
                  index === currentIndex
                    ? 'bg-[var(--color-accent-magenta)] scale-125 shadow-[0_0_8px_var(--color-accent-magenta)]'
                    : 'bg-white/10 hover:bg-[var(--color-accent-jedi-blue)]/70'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
                animate={index === currentIndex ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: index === currentIndex ? 1.3 : 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de swipe para móvil */}
      {isMobile && (
        <motion.div 
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white/60 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Desliza
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Carousel;