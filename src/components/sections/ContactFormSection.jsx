import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../ui/ContactForm";

const ContactFormSection = () => {
  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Título holográfico */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <span className="font-mono tracking-wider">CONTACTO DIRECTO</span>
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
          initial={{ width: 0 }}
          animate={{ width: "75%" }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        className="text-base sm:text-lg text-[var(--color-text-primary)]/80 text-center mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl px-2 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Completa el formulario y me pondré en contacto contigo lo antes posible.
        Cada mensaje activa un nuevo canal de colaboración.
      </motion.p>

      {/* Formulario limpio */}
      <motion.div
        className="w-full max-w-sm sm:max-w-xl md:max-w-2xl px-2 sm:px-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      >
        
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[var(--color-accent-jedi-green)]/30">
              FORM_CHANNEL
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[var(--color-accent-jedi-blue)]/60 tracking-widest">
              LIVE
            </span>
          </div>
          <ContactForm />
       
      </motion.div>

      {/* Indicador inferior */}
      <motion.div
        className="mt-8 sm:mt-10 text-center font-mono text-[10px] sm:text-xs text-[var(--color-text-primary)]/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        [ FIN_FORMULARIO_CONTACTO ]
      </motion.div>
    </motion.section>
  );
};

export default ContactFormSection;
