import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaExternalLinkAlt,
  FaCode,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiTailwindcss,
  SiMongodb,
  SiDjango,
  SiPython,
  SiMysql,
  SiSpringboot,
  SiAxios,
  SiJunit5,
  SiJsonwebtokens,
  SiCssdesignawards,
  SiPostman,
  SiOracle,
} from "react-icons/si";
import { GiAngularSpider } from "react-icons/gi";
import { TbBrandVite, TbBrandJavascript } from "react-icons/tb";

// Colores oficiales (aprox) de cada tecnología para identificación clara
const techBrandColors = {
  React: "#61DAFB",
  Node: "#339933",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  Django: "#092E20",
  Tailwind: "#06B6D4",
  Git: "#F05032",
  SQL: "#4D4D4D", // Genérico
  Python: "#3776AB",
  Javascript: "#F7DF1E",
  Java: "#007396",
  MySQL: "#4479A1",
  SpringBoot: "#6DB33F",
  Axios: "#5A29E4",
  Junit: "#25A162",
  JWT: "#872BE2",
  Vite: "#646CFF",
  Angular: "#DD0031",
  Css: "#264DE4",
  Postman: "#FF6C37",
  Oracle: "#F80000",
  Tkinter: "#3776AB",
  Pytest: "#0A9EDC",
};

// Mapeo a íconos aplicando color oficial
const techIcons = Object.fromEntries(
  Object.entries(techBrandColors).map(([tech, color]) => {
    const baseProps = { className: "text-xl", style: { color } };
    let iconEl;
    switch (tech) {
      case "React":
        iconEl = <FaReact {...baseProps} />;
        break;
      case "Node":
        iconEl = <FaNodeJs {...baseProps} />;
        break;
      case "PostgreSQL":
        iconEl = <SiPostgresql {...baseProps} />;
        break;
      case "MongoDB":
        iconEl = <SiMongodb {...baseProps} />;
        break;
      case "Django":
        iconEl = <SiDjango {...baseProps} />;
        break;
      case "Tailwind":
        iconEl = <SiTailwindcss {...baseProps} />;
        break;
      case "Git":
        iconEl = <FaGitAlt {...baseProps} />;
        break;
      case "SQL":
        iconEl = <FaDatabase {...baseProps} />;
        break;
      case "Python":
        iconEl = <SiPython {...baseProps} />;
        break;
      case "Javascript":
        iconEl = <TbBrandJavascript {...baseProps} />;
        break;
      case "Java":
        iconEl = <FaJava {...baseProps} />;
        break;
      case "MySQL":
        iconEl = <SiMysql {...baseProps} />;
        break;
      case "SpringBoot":
        iconEl = <SiSpringboot {...baseProps} />;
        break;
      case "Axios":
        iconEl = <SiAxios {...baseProps} />;
        break;
      case "Junit":
        iconEl = <SiJunit5 {...baseProps} />;
        break;
      case "JWT":
        iconEl = <SiJsonwebtokens {...baseProps} />;
        break;
      case "Vite":
        iconEl = <TbBrandVite {...baseProps} />;
        break;
      case "Angular":
        iconEl = <GiAngularSpider {...baseProps} />;
        break;
      case "Css":
        iconEl = <SiCssdesignawards {...baseProps} />;
        break;
      case "Postman":
        iconEl = <SiPostman {...baseProps} />;
        break;
      case "Oracle":
        iconEl = <SiOracle {...baseProps} />;
        break;
      case "Tkinter":
        iconEl = <SiPython {...baseProps} />;
        break;
      case "Pytest":
        iconEl = <SiPython {...baseProps} />;
        break;
      default:
        iconEl = <FaCode {...baseProps} />;
        break;
    }
    return [tech, iconEl];
  })
);

const ProjectCard = ({ project }) => {
  const techList =
    typeof project.technologies === "string"
      ? project.technologies.split(",").map((t) => t.trim())
      : project.technologies || [];

  const reduceMotion = useReducedMotion();

  // Memoize particle configuration so random values are stable and not recalculated every render
  const particleConfigs = React.useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        left: 20 + Math.random() * 60,
        top: 20 + Math.random() * 60,
        duration: 2 + Math.random(),
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Marco holográfico principal */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-jedi-blue)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5 backdrop-blur-sm transition-all duration-500 group-hover:border-[var(--color-accent-jedi-blue)]/60 group-hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]">
        {/* Esquinas brillantes */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Partículas flotantes (omitidas en reduce motion) */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {particleConfigs.map((cfg, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-40"
              style={{ left: `${cfg.left}%`, top: `${cfg.top}%` }}
              animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: cfg.duration,
                repeat: Infinity,
                delay: cfg.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header con badge */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-3 py-1 rounded-full border border-[var(--color-accent-jedi-green)]/30">
              {project.projectType || "PROJECT"}
            </span>
            <span className="text-xs font-mono text-[var(--color-accent-jedi-blue)]/60">
              {project.year || "2024"}
            </span>
          </div>

          <motion.h3
            className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] mb-3 group-hover:from-[var(--color-accent-jedi-green)] group-hover:to-[var(--color-accent-jedi-blue)] transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaCode className="inline mr-3 text-[var(--color-accent-jedi-blue)]" />
            {project.title}
          </motion.h3>
        </div>

        {/* Descripción */}
        <motion.p
          className="text-[var(--color-text-primary)]/80 font-sans leading-relaxed mb-6 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Mi rol */}
        {project.myRole && (
          <motion.div
            className="mb-6 p-4 rounded-lg border border-[var(--color-accent-jedi-blue)]/20 bg-[var(--color-accent-jedi-blue)]/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm font-mono text-[var(--color-accent-jedi-blue)] mb-2">
              MI ROL:
            </div>
            <div className="text-[var(--color-text-primary)]/90 font-semibold">
              {project.myRole}
            </div>
          </motion.div>
        )}

        {/* Tecnologías */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm font-mono text-[var(--color-accent-jedi-green)] mb-3 tracking-wider">
            TECNOLOGÍAS:
          </div>
          <div className="flex flex-wrap gap-3">
            {techList.map((tech, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 bg-[var(--color-background)]/50 backdrop-blur-sm border border-[var(--color-accent-jedi-green)]/30 rounded-lg px-3 py-2 hover:border-[var(--color-accent-jedi-green)]/60 hover:bg-[var(--color-accent-jedi-green)]/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {techIcons[tech] || (
                  <FaCode className="text-[var(--color-text-primary)] text-lg" />
                )}
                <span className="text-xs font-mono text-[var(--color-text-primary)]/80">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botones de acción rediseñados */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="group relative overflow-hidden w-full inline-block text-center font-mono font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaExternalLinkAlt className="text-sm" />
                VER DETALLES
              </span>
              {/* Efecto de barrido */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </motion.div>

          {project.githubUrl && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-block font-mono font-bold py-3 px-4 border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_15px_rgba(0,255,159,0.2)] hover:shadow-[0_0_30px_rgba(0,255,159,0.5)]"
              >
                <span className="relative z-10">
                  <FaGithub className="text-xl" />
                </span>
                {/* Efecto de barrido */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Indicador de status en la esquina */}
        <div className="absolute top-4 right-4 text-xs font-mono text-[var(--color-accent-jedi-green)]/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-accent-jedi-green)] rounded-full animate-pulse" />
            ACTIVO
          </div>
        </div>
      </div>

      {/* Overlay de escaneo removido: ahora manejado globalmente */}
    </motion.div>
  );
};

export default ProjectCard;
