import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Button from './ui/Button'; // Asegúrate de que Button esté disponible

const Carousel = ({ slides }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
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
          className="relative w-full max-w-[90rem] mx-auto overflow-hidden rounded-3xl shadow-[0_0_40px_var(--color-accent-jedi-blue)] bg-[var(--color-background)]/40 backdrop-blur-lg animate-fade-in-up py-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      >
        <motion.div
            ref={carouselRef}
            className="flex cursor-grab items-center"
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
                  className="flex-shrink-0 w-full px-8 flex flex-col items-center justify-center text-center"
                  style={{
                    // No scaling/opacity effects for simpler CTA slides
                    zIndex: index === currentIndex ? 2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="max-w-3xl w-full py-10">
                  <h2 className="text-4xl md:text-5xl font-display mb-6 lightsaber-underline">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl font-sans text-[var(--color-text-primary)] mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  {slide.button && (
                      <Button
                          as={slide.button.as || 'button'}
                          href={slide.button.href}
                          onClick={slide.button.onClick}
                          className={slide.button.className}
                      >
                        {slide.button.text}
                      </Button>
                  )}
                  {slide.secondaryButton && (
                      <Button
                          as={slide.secondaryButton.as || 'button'}
                          href={slide.secondaryButton.href}
                          onClick={slide.secondaryButton.onClick}
                          className={slide.secondaryButton.className + ' ml-4'}
                      >
                        {slide.secondaryButton.text}
                      </Button>
                  )}
                </div>
              </motion.div>
          ))}
        </motion.div>

        {/* Botones de navegación */}
        <button
            onClick={goToPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[var(--color-accent-jedi-blue)]/20 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition duration-300 z-20"
            aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[var(--color-accent-jedi-blue)]/20 backdrop-blur-md text-white p-4 rounded-full shadow-lg hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition duration-300 z-20"
            aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 z-20">
          {slides.map((_, index) => (
              <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full border-2 border-[var(--color-accent-jedi-blue)] shadow-sm transition-all duration-300 focus:outline-none ${
                      index === currentIndex
                          ? 'bg-[var(--color-accent-magenta)] scale-125 shadow-[0_0_8px_var(--color-accent-magenta)]'
                          : 'bg-white/10 hover:bg-[var(--color-accent-jedi-blue)]/70'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                  animate={index === currentIndex ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
          ))}
        </div>
      </motion.div>
  );
};

export default Carousel;