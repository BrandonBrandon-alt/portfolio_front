import React from "react";
import { motion } from "framer-motion";
import {
  FaFilePdf,
  FaCertificate,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

const CertificateCard = ({ certificate, index }) => {
  const {
    title,
    provider,
    instructor,
    date,
    category,
    level,
    duration,
    image,
    pdfUrl,
    skills,
    description,
  } = certificate;

  // Función para abrir el PDF
  const openPDF = () => {
    if (pdfUrl) {
      window.open(
        pdfUrl,
        "_blank",
        "width=800,height=900,scrollbars=yes,resizable=yes"
      );
    }
  };

  // Colores por categoría
  const categoryColors = {
    Frontend: {
      border: "border-[var(--color-accent-jedi-blue)]",
      bg: "bg-[var(--color-accent-jedi-blue)]",
      text: "text-[var(--color-accent-jedi-blue)]",
    },
    Backend: {
      border: "border-[var(--color-accent-jedi-green)]",
      bg: "bg-[var(--color-accent-jedi-green)]",
      text: "text-[var(--color-accent-jedi-green)]",
    },
    "Data Science": {
      border: "border-purple-400",
      bg: "bg-purple-400",
      text: "text-purple-400",
    },
    DevOps: {
      border: "border-orange-400",
      bg: "bg-orange-400",
      text: "text-orange-400",
    },
    Cloud: {
      border: "border-cyan-400",
      bg: "bg-cyan-400",
      text: "text-cyan-400",
    },
    Programming: {
      border: "border-yellow-400",
      bg: "bg-yellow-400",
      text: "text-yellow-400",
    },
    Tools: {
      border: "border-gray-400",
      bg: "bg-gray-400",
      text: "text-gray-400",
    },
  };

  const colors = categoryColors[category] || categoryColors.Frontend;

  // Niveles con iconos
  const levelConfig = {
    Beginner: { icon: "🥉", color: "text-green-400" },
    Intermediate: { icon: "🥈", color: "text-blue-400" },
    Advanced: { icon: "🥇", color: "text-yellow-400" },
    Foundational: { icon: "📚", color: "text-purple-400" },
  };

  const levelInfo = levelConfig[level] || levelConfig.Intermediate;

  return (
    <motion.div
      className="group relative bg-[var(--color-background)]/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {/* Glow effect en hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${colors.bg}/20 blur-xl`}
      />

      {/* Border glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.border}/50 border rounded-xl`}
      />

      {/* Contenido */}
      <div className="relative z-10 p-6">
        {/* Header con imagen/icono y badges */}
        <div className="flex items-start justify-between mb-4">
          {/* Imagen/Icono del certificado */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-16 h-16 rounded-xl ${colors.bg}/20 border ${colors.border}/30 flex items-center justify-center group-hover:${colors.border}/60 transition-colors duration-300`}
            >
              {image ? (
                <img
                  src={image}
                  alt={`${title} certificate`}
                  className="w-12 h-12 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <FaCertificate
                className={`w-8 h-8 ${colors.text} ${
                  image ? "hidden" : "flex"
                }`}
              />
            </div>

            {/* Badge de nivel */}
            <div className="absolute -top-2 -right-2">
              <span
                className={`text-lg ${levelInfo.color} drop-shadow-lg`}
                title={level}
              >
                {levelInfo.icon}
              </span>
            </div>
          </div>

          {/* Badges superior derecho */}
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs font-mono px-2 py-1 rounded-full ${colors.bg}/20 ${colors.text} border ${colors.border}/30`}
            >
              {category}
            </span>
            <span className="text-xs font-mono text-[var(--color-text-primary)]/60">
              {date}
            </span>
          </div>
        </div>

        {/* Título y proveedor */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-jedi-blue)] group-hover:to-[var(--color-accent-jedi-green)] transition-all duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]/70">
            <FaGraduationCap className="w-4 h-4" />
            <span className="font-semibold">{provider}</span>
            {instructor && (
              <>
                <span>•</span>
                <span>{instructor}</span>
              </>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-[var(--color-text-primary)]/80 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-4 text-xs text-[var(--color-text-primary)]/60">
          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={levelInfo.color}>●</span>
            <span>{level}</span>
          </div>
        </div>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded-md bg-[var(--color-accent-jedi-green)]/10 text-[var(--color-accent-jedi-green)] border border-[var(--color-accent-jedi-green)]/20"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-[var(--color-text-primary)]/60 border border-white/10">
              +{skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer con botón de verificación */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-accent-jedi-green)] rounded-full animate-pulse" />
            <span className="text-xs font-mono text-[var(--color-accent-jedi-green)]">
              VERIFICADO
            </span>
          </div>

          {pdfUrl && (
            <motion.button
              onClick={openPDF}
              className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border ${colors.border}/30 ${colors.text} hover:${colors.bg}/20 hover:${colors.border}/60 transition-all duration-300 cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>VER CERTIFICADO</span>
              <FaFilePdf className="w-3 h-3" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${colors.bg} rounded-full opacity-0 group-hover:opacity-60`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Efecto holográfico en hover */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default CertificateCard;
