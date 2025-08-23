// sections/ProjectList.jsx (refactor holográfico)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants } from "../../styles/animations";
import projectsData from "../../data/projects.json";
import RevealProjectCard from "../ui/RevealProjectCard";

// (Hook extraído a RevealProjectCard)

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Limitamos a los 3 primeros para teaser
    setProjects(projectsData.slice(0, 3));
  }, []);

  return (
    <motion.section
      id="proyectos-destacados"
      aria-labelledby="featured-projects-title"
      className="relative mt-8 sm:mt-10 mb-16 sm:mb-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Marco holográfico contenedor */}
      <div className="holo-frame" data-corners="on">
        <div className="panel-holo p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Glow / partículas sutiles decorativas */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] sm:opacity-[0.07] mix-blend-screen">
            <div className="absolute -top-16 sm:-top-32 -left-8 sm:-left-16 w-48 sm:w-96 h-48 sm:h-96 bg-[var(--color-accent-jedi-blue)] blur-[60px] sm:blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 sm:-bottom-40 -right-5 sm:-right-10 w-56 sm:w-[28rem] h-56 sm:h-[28rem] bg-[var(--color-accent-jedi-green)] blur-[70px] sm:blur-[140px] rounded-full" />
          </div>

          {/* Encabezado */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 sm:mb-10 md:mb-12 text-center"
          >
            <div className="mb-4 sm:mb-5 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-mono px-2 sm:px-4 py-1 rounded-full border border-[var(--color-accent-jedi-blue)]/40 text-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)]/10 shadow-[0_0_0_1px_rgba(0,240,255,0.15)]">
                [ FEATURED_CHANNEL ]
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-mono px-2 sm:px-4 py-1 rounded-full border border-[var(--color-accent-jedi-green)]/40 text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10">
                {projects.length.toString().padStart(2, "0")} ITEMS
              </span>
            </div>
            <h2
              id="featured-projects-title"
              className="holo-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            >
              PROYECTOS DESTACADOS
            </h2>
            <p className="holo-lead mt-4 sm:mt-6 max-w-2xl sm:max-w-3xl mx-auto opacity-90 px-2 sm:px-0">
              Explora una selección de mis trabajos más recientes y
              significativos. Cada proyecto representa una historia de
              innovación, resolución de problemas y evolución técnica.
            </p>
          </motion.div>

          {/* Grid de proyectos */}
          <div className="relative">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
              variants={itemVariants}
            >
              {projects.length > 0 ? (
                projects.map((project, idx) => (
                  <RevealProjectCard
                    key={project.id}
                    project={project}
                    motionDelay={idx * 0.1}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16 sm:py-20 font-mono text-xs sm:text-sm tracking-widest text-[var(--color-text-primary)]/60">
                  [ NO_DATA_AVAILABLE ]
                </div>
              )}
            </motion.div>
          </div>

          {/* Botón Ver todos */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 md:mt-14 flex justify-center"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 sm:gap-3 font-mono font-bold tracking-wider px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-[var(--color-accent-jedi-blue)]/40 text-[var(--color-accent-jedi-blue)] overflow-hidden transition-all duration-500 hover:text-[var(--color-background)] hover:border-[var(--color-accent-jedi-green)]/60 bg-[linear-gradient(120deg,rgba(0,240,255,0.08),rgba(0,255,159,0.08))] hover:shadow-[0_0_30px_-6px_rgba(0,255,159,0.5)] sm:hover:shadow-[0_0_40px_-6px_rgba(0,255,159,0.6)] text-sm sm:text-base"
              aria-label="Ver todos los proyectos"
            >
              <span className="relative z-10">VER TODOS LOS PROYECTOS</span>
              {/* Barrido */}
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-[1100ms]" />
              {/* Glow hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] mix-blend-overlay" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectList;
