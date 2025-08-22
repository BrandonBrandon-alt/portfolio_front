import React from "react";
import { motion } from "framer-motion";
import SkillsSection from "../components/sections/SkillsSection";
import { containerVariants, itemVariants } from "../styles/animations.js";

const SkillsPage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-16 px-4 md:px-8 lg:px-16"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-display font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
        variants={itemVariants}
      >
        <span className="font-mono tracking-wider">
          MATRIZ_DE_COMPETENCIAS:
        </span>
        {/* Línea animada */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        {/* Barrido */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.h1>

      <motion.section
        className="mb-10 text-center md:text-left max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <p className="text-lg leading-relaxed text-[var(--color-text-primary)] mb-4">
          Mi conjunto de habilidades es el resultado de un compromiso constante
          con el aprendizaje y la aplicación práctica. Cada tecnología que
          domino ha sido explorada a través de proyectos reales, desafíos
          complejos y una curiosidad insaciable por cómo funcionan las cosas.
        </p>
        <p className="text-lg leading-relaxed text-[var(--color-text-primary)]">
          Esta combinación de estudio autodidacta y experiencia práctica me
          permite no solo entender los conceptos, sino también implementarlos de
          manera eficiente y robusta. A continuación, presento las herramientas
          y lenguajes que conforman mi arsenal tecnológico:
        </p>
      </motion.section>

      <SkillsSection isStandalonePage={true} />
      {/* Puedes añadir más contenido específico de la página de habilidades aquí */}
    </motion.div>
  );
};

export default SkillsPage;
