import React from "react";
import { motion } from "framer-motion";
import {
  SiAxios,
  SiCypress,
  SiDjango,
  SiEslint,
  SiGradle,
  SiHibernate,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiOracle,
  SiPodman,
  SiPostgresql,
  SiPostman,
  SiReactrouter,
  SiSonarqube,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiVite,
  SiVitest,
} from "react-icons/si";
import {
  FaAngular,
  FaCss3,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";

const skills = [
  { name: "React", icon: FaReact, category: "Frontend" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Python", icon: FaPython, category: "Backend" },
  { name: "Django", icon: SiDjango, category: "Backend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "SQL", icon: FaDatabase, category: "Database" },
  { name: "Git", icon: FaGitAlt, category: "Tools" },
  { name: "Java", icon: FaJava, category: "Backend" },
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "Docker", icon: FaDocker, category: "DevOps" },
  { name: "Podman", icon: SiPodman, category: "DevOps" },
  { name: "Postman", icon: SiPostman, category: "Tools" },
  { name: "Angular", icon: FaAngular, category: "Frontend" },
  { name: "JWT", icon: SiJsonwebtokens, category: "Security" },
  { name: "Oracle", icon: SiOracle, category: "Database" },
  { name: "Spring Boot", icon: SiSpringboot, category: "Backend" },
  { name: "Vite", icon: SiVite, category: "Tools" },
  { name: "Spring Security", icon: SiSpringsecurity, category: "Security" },
  { name: "JPA (Hibernate)", icon: SiHibernate, category: "Backend" },
  { name: "MySQL", icon: SiMysql, category: "Database" },
  { name: "Gradle", icon: SiGradle, category: "Tools" },
  { name: "Vitest", icon: SiVitest, category: "Testing" },
  { name: "Cypress", icon: SiCypress, category: "Testing" },
  { name: "ESLint", icon: SiEslint, category: "Tools" },
  { name: "React Router", icon: SiReactrouter, category: "Frontend" },
  { name: "Axios", icon: SiAxios, category: "Frontend" },
  { name: "CSS", icon: FaCss3, category: "Frontend" },
  { name: "SonarQube", icon: SiSonarqube, category: "Tools" },
];

// Colores oficiales aproximados de cada tecnología
const brandColors = {
  React: "#61DAFB",
  "Node.js": "#339933",
  Python: "#3776AB",
  Django: "#092E20",
  "Tailwind CSS": "#06B6D4",
  MongoDB: "#47A248",
  SQL: "#4D4D4D",
  Git: "#F05032",
  Java: "#007396",
  JavaScript: "#F7DF1E",
  PostgreSQL: "#336791",
  Docker: "#2496ED",
  Podman: "#892CA0",
  Postman: "#FF6C37",
  Angular: "#DD0031",
  JWT: "#872BE2",
  Oracle: "#F80000",
  "Spring Boot": "#6DB33F",
  Vite: "#646CFF",
  "Spring Security": "#6DB33F",
  "JPA (Hibernate)": "#59666C",
  MySQL: "#4479A1",
  Gradle: "#02303A",
  Vitest: "#729B1B",
  Cypress: "#172026",
  ESLint: "#4B32C3",
  "React Router": "#CA4245",
  Axios: "#5A29E4",
  CSS: "#264DE4",
  SonarQube: "#4E9BCD",
};

const SkillsSection = ({ isStandalonePage = false }) => {
  const sectionClasses = isStandalonePage
    ? "py-20 px-4 container mx-auto text-center relative"
    : "py-20 px-4 container mx-auto text-center relative";

  return (
    <motion.section
      className={sectionClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Partículas de fondo holográficas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Título holográfico */}
      <motion.h2
        className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="font-mono tracking-wider">MATRIZ DE COMPETENCIAS</span>
        {/* Línea animada */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {/* Efecto de escaneo en el título */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.h2>

      {/* Subtítulo */}
      <motion.p
        className="text-lg text-[var(--color-text-primary)]/80 mb-12 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        [ TECNOLOGÍAS DOMINADAS ]
      </motion.p>

      {/* Contenedor principal holográfico */}
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Marco holográfico */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-jedi-blue)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5 backdrop-blur-sm">
          {/* Esquinas brillantes */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl opacity-80" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl opacity-80" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl opacity-80" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl opacity-80" />
        </div>

        {/* Grid de habilidades */}
        <div className="relative z-10 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-h-[600px] overflow-y-auto">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            const brand = brandColors[skill.name];
            const fallbackBlue = index % 2 === 0; // mantiene estética si no hay brand
            const baseColor = brand || (fallbackBlue ? "#00f0ff" : "#00ff9f");
            const borderColor = brand
              ? "border-white/10"
              : fallbackBlue
              ? "border-[var(--color-accent-jedi-blue)]/30"
              : "border-[var(--color-accent-jedi-green)]/30";
            const hoverBorderColor = brand
              ? "group-hover:border-white/30"
              : fallbackBlue
              ? "group-hover:border-[var(--color-accent-jedi-blue)]/60"
              : "group-hover:border-[var(--color-accent-jedi-green)]/60";
            const shadowColor = brand
              ? "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              : fallbackBlue
              ? "group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              : "group-hover:shadow-[0_0_20px_rgba(0,255,159,0.3)]";

            return (
              <motion.div
                key={index}
                className={`group relative p-6 rounded-xl border-2 ${borderColor} ${hoverBorderColor} bg-[var(--color-background)]/50 backdrop-blur-sm ${shadowColor} flex flex-col items-center justify-center transition-all duration-500 overflow-hidden`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Esquinas brillantes mini */}
                <div
                  className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${
                    brand
                      ? "border-white/30"
                      : fallbackBlue
                      ? "border-[var(--color-accent-jedi-green)]"
                      : "border-[var(--color-accent-jedi-blue)]"
                  } rounded-tl-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />
                <div
                  className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${
                    brand
                      ? "border-white/30"
                      : fallbackBlue
                      ? "border-[var(--color-accent-jedi-green)]"
                      : "border-[var(--color-accent-jedi-blue)]"
                  } rounded-tr-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${
                    brand
                      ? "border-white/30"
                      : fallbackBlue
                      ? "border-[var(--color-accent-jedi-green)]"
                      : "border-[var(--color-accent-jedi-blue)]"
                  } rounded-bl-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${
                    brand
                      ? "border-white/30"
                      : fallbackBlue
                      ? "border-[var(--color-accent-jedi-green)]"
                      : "border-[var(--color-accent-jedi-blue)]"
                  } rounded-br-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />

                {/* Icono */}
                <motion.div
                  className={`text-4xl md:text-5xl mb-3 relative z-10`}
                  animate={{
                    y: [0, -4, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <IconComponent style={{ color: baseColor }} />
                </motion.div>

                {/* Nombre de la habilidad */}
                <h3 className="text-sm md:text-base font-mono font-bold text-[var(--color-text-primary)] text-center relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-jedi-blue)] group-hover:to-[var(--color-accent-jedi-green)] transition-all duration-300">
                  {skill.name}
                </h3>

                {/* Categoría */}
                <span className="text-xs font-mono text-[var(--color-text-primary)]/60 mt-1 relative z-10">
                  {skill.category}
                </span>

                {/* Efecto de barrido */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`}
                  style={{
                    boxShadow: brand ? `0 0 12px ${baseColor}40` : undefined,
                  }}
                />

                {/* Partícula central */}
                <motion.div
                  className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60`}
                  style={{ background: baseColor }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random(),
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Overlay interno eliminado (global cubre el efecto) */}
      </motion.div>

      {/* Indicador de estadísticas */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="inline-flex items-center gap-4 font-mono text-sm text-[var(--color-text-primary)]/60">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-accent-jedi-green)] rounded-full animate-pulse" />
            {skills.length} TECNOLOGÍAS ACTIVAS
          </span>
          <span className="text-[var(--color-accent-jedi-blue)]">|</span>
          <span>NIVEL: AVANZADO</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;
