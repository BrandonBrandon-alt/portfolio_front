import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Show after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] shadow-lg hover:bg-[var(--color-accent-jedi-green)] transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]/70 focus-visible:ring-offset-2"
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Volver arriba"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
