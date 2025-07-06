import React from 'react';
import { motion } from 'framer-motion';
import SkillsSection from '../components/sections/SkillsSection';

const SkillsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-16 px-4 md:px-8 lg:px-16"
    >
      <h1 className="text-5xl md:text-6xl font-display text-center mb-12 lightsaber-underline">
        Mis Habilidades
      </h1>
      <SkillsSection />
      {/* Puedes añadir más contenido específico de la página de habilidades aquí */}
    </motion.div>
  );
};

export default SkillsPage;
