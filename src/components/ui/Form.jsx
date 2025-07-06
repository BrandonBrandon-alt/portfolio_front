import React from 'react';
import { motion } from 'framer-motion';

const Form = ({ children, onSubmit, className = '', ...props }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className={`bg-[var(--color-background)]/50 backdrop-blur-lg border border-[var(--color-accent-jedi-blue)]/30 rounded-lg p-8 shadow-[0_0_20px_var(--color-accent-jedi-blue)]/30 flex flex-col space-y-6 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.form>
  );
};

export default Form;
