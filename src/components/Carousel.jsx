import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import ProjectCard from './ui/ProjectCard';

const Carousel = ({ projects }) => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  const getSlideStyle = (index) => {
    const currentDragOffset = x.get();
    const slideWidth = carouselRef.current?.offsetWidth || 0;
    if (slideWidth === 0) return { scale: 1, opacity: 1 };
    const targetXForIndex = -index * slideWidth;
    const diff = Math.abs(currentDragOffset - targetXForIndex);
    const distanceFactor = Math.min(1, diff / slideWidth);
    const scaleValue = 1 - (distanceFactor * 0.15);
    const opacityValue = 1 - (distanceFactor * 0.4);
    return { scale: scaleValue, opacity: opacityValue };
  };

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
    const nextIndex = (currentIndex + 1) % projects.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const nextIndex = (currentIndex - 1 + projects.length) % projects.length;
    goToSlide(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, projects.length]);

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
                targetIndex = Math.min(projects.length - 1, currentIndex + 1);
              } else if (velocity > 500) {
                targetIndex = Math.max(0, currentIndex - 1);
              } else {
                targetIndex = Math.round(currentOffset / -slideWidth);
                targetIndex = Math.max(0, Math.min(projects.length - 1, targetIndex));
              }
              goToSlide(targetIndex);
            }}
        >
          {projects.map((project, index) => {
            const { scale: slideScale, opacity: slideOpacity } = getSlideStyle(index);
            const isActive = index === currentIndex;
            return (
                <motion.div
                    key={project.id}
                    className="flex-shrink-0 w-full px-8 flex items-center justify-center"
                    style={{
                      scale: slideScale,
                      opacity: slideOpacity,
                      zIndex: isActive ? 2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="max-w-5xl w-full">
                    <ProjectCard project={project} />
                  </div>
                </motion.div>
            );
          })}
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
          {projects.map((_, index) => (
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
