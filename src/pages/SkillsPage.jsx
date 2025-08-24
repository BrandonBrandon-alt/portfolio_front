import React from "react";
import usePageMeta from "../hooks/usePageMeta";
import { motion } from "framer-motion";
import SkillsSection from "../components/sections/SkillsSection";
import { itemVariants } from "../styles/animations.js";
import PageTitleBlock from "../components/ui/PageTitleBlock";
import HolographicContainer from "../components/ui/HolographicContainer";

const SkillsPage = () => {
  usePageMeta({
    title: "Habilidades",
    description:
      "Matriz de competencias: tecnologías y herramientas dominadas por Brandon Montealegre.",
  });

  return (
    <HolographicContainer
      maxWidth="6xl"
      particleCount={18}
      gridColumns={8}
      showGrid={true}
      showParticles={true}
      cornerVariant="blue"
      innerPadding="py-8 sm:py-12 md:py-16"
    >
      <PageTitleBlock
        title="MATRIZ DE COMPETENCIAS"
        badges={[
          { text: "[ SKILLS ]", variant: "blue" },
          { text: "LIVE", variant: "green" },
        ]}
        lead="Resumen de tecnologías, herramientas y fundamentos que aplico para construir soluciones escalables, mantenibles y orientadas a resultados."
      />

      <motion.section
        className="mb-10 text-center md:text-left max-w-4xl mx-auto"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
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
    </HolographicContainer>
  );
};

export default SkillsPage;
