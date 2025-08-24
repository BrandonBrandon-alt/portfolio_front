// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from "react";
import usePageMeta from "../hooks/usePageMeta";
import projectsData from "../data/projects.json";
import { motion } from "framer-motion";
import RevealProjectCard from "../components/ui/RevealProjectCard";
import ProjectCardSkeleton from "../components/ui/ProjectCardSkeleton";
import PageTitleBlock from "../components/ui/PageTitleBlock";
import HolographicContainer from "../components/ui/HolographicContainer";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setProjects(projectsData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading projects:", err);
      setLoading(false);
    }
  }, []);

  usePageMeta({
    title: "Proyectos",
    description:
      "Explora proyectos de desarrollo Full Stack: casos de estudio, tecnologías y resultados.",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  // Loading state with unified title block
  if (loading) {
    return (
      <HolographicContainer
        maxWidth="6xl"
        particleCount={15}
        gridColumns={8}
        showGrid={true}
        showParticles={true}
        cornerVariant="green"
        innerPadding="py-8 sm:py-12 md:py-16"
      >
        <PageTitleBlock
          as="h1"
          title="PROYECTOS"
          badges={[
            { text: "[ PROJECTS ]", variant: "blue" },
            { text: "LOADING", variant: "green" },
          ]}
          lead="Explorando proyectos destacados y resultados clave..."
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label="Cargando proyectos"
        >
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </HolographicContainer>
    );
  }

  return (
    <HolographicContainer
      maxWidth="6xl"
      particleCount={15}
      gridColumns={8}
      showGrid={true}
      showParticles={true}
      cornerVariant="green"
      innerPadding="py-8 sm:py-12 md:py-16"
    >
      <PageTitleBlock
        as="h1"
        title="PROYECTOS"
        badges={[
          { text: "[ PROJECTS ]", variant: "blue" },
          { text: "LIVE", variant: "green" },
        ]}
        lead="Selección de proyectos con foco en impacto técnico y resultados medibles."
      />
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <RevealProjectCard
              key={project.id}
              project={project}
              motionDelay={idx * 0.05}
            />
          ))}
        </div>
      ) : (
        <motion.p
          className="text-center font-mono text-[var(--color-text-muted)] text-lg mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          role="alert"
          aria-live="assertive"
        >
          No se encontraron proyectos registrados en este holocrón.
        </motion.p>
      )}
    </HolographicContainer>
  );
};

export default ProjectsPage;
