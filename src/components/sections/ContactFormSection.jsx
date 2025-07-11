import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../ui/ContactForm';

const ContactFormSection = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
          className="text-4xl md:text-5xl font-display text-[var(--color-text-primary)] mb-6 lightsaber-underline"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        Contáctame
      </motion.h2>

      <ContactForm />
    </motion.div>
  );
};

export default ContactFormSection;
