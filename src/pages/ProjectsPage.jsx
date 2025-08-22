// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from "react";
import projectsData from "../data/projects.json";
import { motion } from "framer-motion";
import RevealProjectCard from "../components/ui/RevealProjectCard";
import ProjectCardSkeleton from "../components/ui/ProjectCardSkeleton";

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

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // (Lazy reveal moved to shared RevealProjectCard)

  if (loading) {
    return (
      <motion.section
        id="proyectos"
        className="page-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
          variants={titleVariants}
        >
          <span className="font-mono tracking-wider">
            HOLOCRONES_DE_PROYECTOS:
          </span>
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="proyectos"
      className="page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-display font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
        variants={titleVariants}
      >
        <span className="font-mono tracking-wider">
          HOLOCRONES_DE_PROYECTOS:
        </span>
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.h2>
      <motion.p className="holo-lead md:text-xl mb-12" variants={titleVariants}>
        Aquí encontrarás una selección de mis proyectos más destacados, cada uno
        representando un desafío superado y una oportunidad para aplicar
        tecnologías innovadoras. Explora las soluciones que he construido.
      </motion.p>

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
        >
          No se encontraron proyectos registrados en este holocrón.
        </motion.p>
      )}
    </motion.section>
  );
};

export default ProjectsPage;
