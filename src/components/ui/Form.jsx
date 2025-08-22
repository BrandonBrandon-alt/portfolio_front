import React from "react";
import { motion } from "framer-motion";

const Form = ({ children, onSubmit, className = "", ...props }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className={`flex flex-col space-y-6 ${className}`}
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
