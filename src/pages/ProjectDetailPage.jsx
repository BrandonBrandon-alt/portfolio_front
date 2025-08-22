import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import { FaGithub } from "react-icons/fa";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = () => {
      try {
        const foundProject = projectsData.find((p) => p.id === parseInt(id));
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Proyecto no encontrado.");
        }
      } catch (err) {
        console.error("Error loading project details from JSON:", err);
        setError("Error al cargar los detalles del proyecto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-[var(--color-accent-jedi-blue)] font-sans text-xl animate-pulse">
        Cargando detalles del proyecto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-500 font-sans text-xl">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-[var(--color-text-muted)] font-sans text-xl">
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Partículas de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Botón de regreso holográfico */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          to="/projects"
          className="group inline-flex items-center font-mono font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] relative overflow-hidden"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 relative z-10" />
          <span className="relative z-10">VOLVER A PROYECTOS</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Link>
      </motion.div>

      {/* Título holográfico */}
      <motion.h1
        className="text-4xl md:text-5xl font-display text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {project.title}
        {/* Efecto de escaneo en el título */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.h1>

      {/* Badge holográfico del tipo de proyecto */}
      {project.projectType && (
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-accent-jedi-green)]/10 text-[var(--color-accent-jedi-green)] border border-[var(--color-accent-jedi-green)]/30 text-sm font-mono tracking-wider relative">
            {project.projectType}
            <div className="absolute inset-0 rounded-full border border-[var(--color-accent-jedi-green)]/60 animate-pulse" />
          </span>
        </motion.div>
      )}

      {/* Contenedor principal holográfico */}
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Marco holográfico principal */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-jedi-blue)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.2)]">
          {/* Esquinas brillantes */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl opacity-80" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl opacity-80" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl opacity-80" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl opacity-80" />
        </div>

        <div className="relative z-10 p-8 space-y-8">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto rounded-md mb-6 shadow-lg"
              loading="lazy"
            />
          )}

          {/* Información del proyecto con diseño holográfico */}
          {(project.myRole || project.teamSize || project.duration) && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[var(--color-accent-jedi-green)]/5 rounded-lg border-2 border-[var(--color-accent-jedi-green)]/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Esquinas brillantes */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-lg opacity-60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-lg opacity-60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-lg opacity-60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-lg opacity-60" />

              {project.myRole && (
                <div className="text-center relative z-10">
                  <h3 className="text-sm font-mono font-semibold text-[var(--color-accent-jedi-green)] mb-1 tracking-wider">
                    MI ROL
                  </h3>
                  <p className="text-[var(--color-text-primary)] font-semibold">
                    {project.myRole}
                  </p>
                </div>
              )}
              {project.teamSize && (
                <div className="text-center relative z-10">
                  <h3 className="text-sm font-mono font-semibold text-[var(--color-accent-jedi-green)] mb-1 tracking-wider">
                    EQUIPO
                  </h3>
                  <p className="text-[var(--color-text-primary)] font-semibold">
                    {project.teamSize}
                  </p>
                </div>
              )}
              {project.duration && (
                <div className="text-center relative z-10">
                  <h3 className="text-sm font-mono font-semibold text-[var(--color-accent-jedi-green)] mb-1 tracking-wider">
                    DURACIÓN
                  </h3>
                  <p className="text-[var(--color-text-primary)] font-semibold">
                    {project.duration}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative">
              <span className="font-mono tracking-wider">
                DESCRIPCIÓN_DEL_PROYECTO:
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-primary)]/90 bg-[var(--color-accent-jedi-blue)]/5 p-6 rounded-lg border border-[var(--color-accent-jedi-blue)]/20">
              {project.description}
            </p>
          </motion.div>

          {/* Mi Contribución con diseño holográfico */}
          {project.myContribution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)] relative">
                <span className="font-mono tracking-wider">
                  MI_CONTRIBUCIÓN:
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </h2>
              <div className="space-y-3">
                {project.myContribution.map((contribution, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-4 bg-[var(--color-accent-jedi-green)]/5 rounded-lg border border-[var(--color-accent-jedi-green)]/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-[var(--color-accent-jedi-green)] mr-3 text-lg font-mono">
                      ▶
                    </span>
                    <span className="text-[var(--color-text-primary)]/90 font-medium">
                      {contribution}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Desafíos */}
          {project.challenges && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-accent-jedi-blue)] drop-shadow-[0_0_8px_var(--color-accent-jedi-blue)]">
                Desafíos Técnicos
              </h2>
              <p className="text-lg leading-relaxed text-[var(--color-text-primary)] bg-[var(--color-accent-jedi-blue)]/10 p-4 rounded-lg border border-[var(--color-accent-jedi-blue)]/30">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Resultados */}
          {project.results && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-accent-jedi-green)] drop-shadow-[0_0_8px_var(--color-accent-jedi-green)]">
                Resultados e Impacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-[var(--color-accent-jedi-green)]/10 p-4 rounded-lg border border-[var(--color-accent-jedi-green)]/30"
                  >
                    <span className="text-[var(--color-text-primary)] flex items-center">
                      <span className="text-[var(--color-accent-jedi-green)] mr-2">
                        ✓
                      </span>
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack Tecnológico con diseño holográfico */}
          {project.technologies && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-2xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)] relative">
                <span className="font-mono tracking-wider">
                  STACK_TECNOLÓGICO:
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.1 }}
                />
              </h2>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(project.technologies)
                  ? project.technologies
                  : project.technologies.split(",").map((t) => t.trim())
                ).map((tech, index) => (
                  <motion.span
                    key={index}
                    className="bg-[var(--color-accent-jedi-blue)]/10 text-[var(--color-accent-jedi-blue)] px-4 py-2 rounded-full text-sm font-mono border border-[var(--color-accent-jedi-blue)]/30 hover:border-[var(--color-accent-jedi-blue)]/60 hover:bg-[var(--color-accent-jedi-blue)]/20 transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botones de acción con diseño holográfico */}
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-4 mt-8 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {project.liveUrl && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden w-full md:w-fit border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] font-mono font-bold py-3 px-6 rounded-lg transition-all duration-500"
                >
                  <span className="relative z-10">VER DEMO</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
            )}
            {project.githubUrl && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden w-full md:w-auto border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_rgba(0,255,159,0.3)] hover:shadow-[0_0_30px_rgba(0,255,159,0.6)] font-mono font-bold py-3 px-6 rounded-lg transition-all duration-500"
                  icon={<FaGithub />}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FaGithub />
                    VER REPOSITORIO BACKEND
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
            )}
            {project.frontendUrl && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  as="a"
                  href={project.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden w-full md:w-fit border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_rgba(0,255,159,0.3)] hover:shadow-[0_0_30px_rgba(0,255,159,0.6)] font-mono font-bold py-3 px-6 rounded-lg transition-all duration-500"
                  icon={<FaGithub />}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FaGithub />
                    VER REPOSITORIO FRONTEND
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Efecto de escaneo holográfico */}
        {/* Overlay de escaneo eliminado (global lo reemplaza) */}
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailPage;
