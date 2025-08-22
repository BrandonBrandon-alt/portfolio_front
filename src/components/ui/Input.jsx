import React from "react";
import { motion } from "framer-motion";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  hasError = false,
  errorMessage = "",
  id,
  ...props
}) => {
  const inputClasses = `w-full p-3 rounded-md bg-[var(--color-background)]/60 border-2 ${
    hasError
      ? "border-[var(--color-accent-sith-red)]"
      : "border-[var(--color-accent-jedi-blue)]/50"
  } text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-jedi-green)] focus:ring-2 focus:ring-[var(--color-accent-jedi-green)]/50 transition-all duration-300 ease-in-out shadow-md ${className}`;

  return (
    <div className="w-full">
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        className={inputClasses}
        whileFocus={{
          scale: 1.01,
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)",
        }}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...props}
      />
      {hasError && errorMessage && (
        <motion.p
          id={`${id}-error`}
          className="text-[var(--color-accent-sith-red)] text-sm mt-1 text-left"
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
