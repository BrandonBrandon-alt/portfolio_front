import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-md bg-[var(--color-background)]/60 border-2 border-[var(--color-accent-jedi-blue)]/50 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-jedi-green)] focus:ring-2 focus:ring-[var(--color-accent-jedi-green)]/50 transition-all duration-300 ease-in-out shadow-md ${className}`}
      whileFocus={{ scale: 1.01, boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)" }}
      {...props}
    />
  );
};

export default Input;
