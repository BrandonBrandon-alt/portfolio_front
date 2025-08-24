import React, { useState, useEffect, useMemo } from "react";
import usePageMeta from "../hooks/usePageMeta";
import { useParams, Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import { motion, useReducedMotion } from "framer-motion";
import { breadcrumbSchema, projectSchema } from "../utils/structuredData";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import { FaGithub } from "react-icons/fa";
import HolographicContainer from "../components/ui/HolographicContainer";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reduceMotion = useReducedMotion();

  // Must be declared before any early returns so hook order stays stable
  const particlePositions = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    []
  );

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

  usePageMeta({
    title: project ? `Proyecto: ${project.title}` : "Proyecto",
    description: project
      ? project.description?.slice(0, 150)
      : "Detalles del proyecto seleccionado en el portafolio de Brandon Montealegre.",
    image:
      project?.imageUrl &&
      (project.imageUrl.startsWith("http")
        ? project.imageUrl
        : project.imageUrl),
  });

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-[var(--color-accent-jedi-blue)] font-sans text-xl animate-pulse"
        role="status"
        aria-live="polite"
      >
        Cargando detalles del proyecto...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-red-500 font-sans text-xl"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center text-[var(--color-text-muted)] font-sans text-xl"
        role="alert"
        aria-live="assertive"
      >
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <HolographicContainer
      maxWidth="7xl"
      particleCount={12}
      gridColumns={8}
      showGrid={true}
      showParticles={!reduceMotion}
      cornerVariant="blue"
      innerPadding="py-8 sm:py-10 md:py-12"
    >
      {/* Structured Data JSON-LD (Breadcrumb + Project) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [
              breadcrumbSchema([
                { name: "Inicio", path: "/" },
                { name: "Proyectos", path: "/projects" },
                { name: project.title, path: `/projects/${project.id}` },
              ]),
              projectSchema(project),
            ].filter(Boolean)
          ),
        }}
      />
      
      {/* Breadcrumb navigation */}
      <nav
        className="mb-5 sm:mb-6 text-xs sm:text-sm font-mono text-[var(--color-text-primary)]/60 flex items-center flex-wrap gap-1 sm:gap-2"
        aria-label="Ruta de navegación"
      >
        <Link
          to="/"
          className="hover:text-[var(--color-accent-jedi-green)] transition-colors"
        >
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to="/projects"
          className="hover:text-[var(--color-accent-jedi-green)] transition-colors"
        >
          Proyectos
        </Link>
        <span aria-hidden="true">/</span>
        <span
          className="text-[var(--color-accent-jedi-green)]"
          aria-current="page"
        >
          {project.title}
        </span>
      </nav>

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
        className="text-3xl sm:text-4xl lg:text-5xl font-display text-center mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative leading-tight px-1"
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
          className="text-center mb-6 sm:mb-8 px-2"
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

        <div className="relative z-10 p-5 sm:p-8 space-y-8 sm:space-y-10">
          {project.imageUrl && (
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-6 shadow-lg border border-[var(--color-accent-jedi-blue)]/20 bg-[var(--color-accent-jedi-blue)]/5">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="1200"
                height="675"
                fetchpriority="low"
              />
            </div>
          )}

          {/* Información del proyecto con diseño holográfico */}
          {(project.myRole || project.teamSize || project.duration) && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-6 bg-[var(--color-accent-jedi-green)]/5 rounded-lg border border-[var(--color-accent-jedi-green)]/25 relative overflow-hidden"
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
                DESCRIPCIÓN PROYECTO
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--color-text-primary)]/90 bg-[var(--color-accent-jedi-blue)]/5 p-4 sm:p-6 rounded-lg border border-[var(--color-accent-jedi-blue)]/20">
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
                  MI CONTRIBUCIÓN
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
                    className="flex items-start p-3 sm:p-4 bg-[var(--color-accent-jedi-green)]/5 rounded-lg border border-[var(--color-accent-jedi-green)]/20 text-sm sm:text-base"
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
              <p className="text-base sm:text-lg leading-relaxed text-[var(--color-text-primary)] bg-[var(--color-accent-jedi-blue)]/10 p-4 rounded-lg border border-[var(--color-accent-jedi-blue)]/30">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-[var(--color-accent-jedi-green)]/10 p-3 sm:p-4 rounded-lg border border-[var(--color-accent-jedi-green)]/30 text-sm sm:text-base"
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
                  STACK TECNOLÓGICO
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1.1 }}
                />
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(Array.isArray(project.technologies)
                  ? project.technologies
                  : project.technologies.split(",").map((t) => t.trim())
                ).map((tech, index) => (
                  <motion.span
                    key={index}
                    className="bg-[var(--color-accent-jedi-blue)]/10 text-[var(--color-accent-jedi-blue)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono border border-[var(--color-accent-jedi-blue)]/30 hover:border-[var(--color-accent-jedi-blue)]/60 hover:bg-[var(--color-accent-jedi-blue)]/20 transition-all duration-300 relative overflow-hidden"
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
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 relative z-20 w-full max-w-3xl mx-auto"
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
                  className="group relative overflow-hidden w-full sm:w-auto border border-[var(--color-accent-jedi-blue)] sm:border-2 text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_12px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] font-mono font-bold py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 text-sm sm:text-base"
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
                  className="group relative overflow-hidden w-full sm:w-auto border border-[var(--color-accent-jedi-green)] sm:border-2 text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_12px_rgba(0,255,159,0.25)] hover:shadow-[0_0_25px_rgba(0,255,159,0.5)] font-mono font-bold py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 text-sm sm:text-base"
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
                  className="group relative overflow-hidden w-full sm:w-auto border border-[var(--color-accent-jedi-green)] sm:border-2 text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_12px_rgba(0,255,159,0.25)] hover:shadow-[0_0_25px_rgba(0,255,159,0.5)] font-mono font-bold py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 text-sm sm:text-base"
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
    </HolographicContainer>
  );
};

export default ProjectDetailPage;
