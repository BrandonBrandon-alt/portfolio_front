import React from 'react';
import { motion } from 'framer-motion';
import SkillsSection from '../components/sections/SkillsSection';
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
        className="text-4xl md:text-5xl font-display text-center mb-8 lightsaber-underline drop-shadow-[0_0_15px_#0ff] animated-text-ray"
        variants={itemVariants}
      >
        MATRIZ DE COMPETENCIAS
      </motion.h1>

      <motion.section
        className="mb-10 text-center md:text-left max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <p className="text-lg leading-relaxed text-[var(--color-text-primary)] mb-4">
          Mi conjunto de habilidades es el resultado de un compromiso constante con el aprendizaje y la aplicación práctica. Cada tecnología que domino ha sido explorada a través de proyectos reales, desafíos complejos y una curiosidad insaciable por cómo funcionan las cosas.
        </p>
        <p className="text-lg leading-relaxed text-[var(--color-text-primary)]">
          Esta combinación de estudio autodidacta y experiencia práctica me permite no solo entender los conceptos, sino también implementarlos de manera eficiente y robusta. A continuación, presento las herramientas y lenguajes que conforman mi arsenal tecnológico:
        </p>
      </motion.section>

      <SkillsSection isStandalonePage={true} />
      {/* Puedes añadir más contenido específico de la página de habilidades aquí */}
    </motion.div>
  );
};

export default SkillsPage;
