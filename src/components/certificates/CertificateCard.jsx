// src/components/certificates/CertificateCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaClock, FaGraduationCap } from "react-icons/fa";

// Mapa de estilos por categoría (coherente con esquema de colores global)
const CATEGORY_STYLES = {
  Frontend: {
    accent: "var(--color-accent-jedi-blue)",
    ring: "ring-[var(--color-accent-jedi-blue)]/40",
    text: "text-[var(--color-accent-jedi-blue)]",
    badge:
      "bg-[var(--color-accent-jedi-blue)]/15 border-[var(--color-accent-jedi-blue)]/40",
  },
  Backend: {
    accent: "var(--color-accent-jedi-green)",
    ring: "ring-[var(--color-accent-jedi-green)]/40",
    text: "text-[var(--color-accent-jedi-green)]",
    badge:
      "bg-[var(--color-accent-jedi-green)]/15 border-[var(--color-accent-jedi-green)]/40",
  },
  "Data Science": {
    accent: "#c084fc",
    ring: "ring-purple-400/40",
    text: "text-purple-400",
    badge: "bg-purple-400/15 border-purple-400/40",
  },
  DevOps: {
    accent: "#fb923c",
    ring: "ring-orange-400/40",
    text: "text-orange-400",
    badge: "bg-orange-400/15 border-orange-400/40",
  },
  Cloud: {
    accent: "#22d3ee",
    ring: "ring-cyan-400/40",
    text: "text-cyan-400",
    badge: "bg-cyan-400/15 border-cyan-400/40",
  },
  Programming: {
    accent: "#15fa20ff",
    ring: "ring-yellow-400/40",
    text: "text-yellow-400",
    badge: "bg-yellow-400/15 border-yellow-400/40",
  },
  Tools: {
    accent: "#9ca3af",
    ring: "ring-gray-400/40",
    text: "text-gray-400",
    badge: "bg-gray-400/15 border-gray-400/40",
  },
};

const LEVEL_INFO = {
  Beginner: { icon: "🥉", color: "text-green-400", label: "Beginner" },
  Intermediate: { icon: "🥈", color: "text-blue-400", label: "Intermediate" },
  Advanced: { icon: "🥇", color: "text-yellow-400", label: "Advanced" },
  Foundational: { icon: "📚", color: "text-purple-400", label: "Foundational" },
};

const CertificateCard = ({ certificate, index, onSelect }) => {
  const {
    title,
    provider,
    date,
    image,
    category,
    level,
    duration,
    skills = [],
    description,
  } = certificate;
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Frontend;
  const levelInfo = LEVEL_INFO[level] || LEVEL_INFO.Intermediate;
  const displayedSkills = skills.slice(0, 4);
  const extra = skills.length - displayedSkills.length;

  return (
    <motion.div
      role="button"
      aria-label={`Ver certificado ${title}`}
      tabIndex={0}
      className="group relative overflow-hidden rounded-xl border border-[var(--card-accent)]/30 bg-gradient-to-br from-[var(--card-accent)]/10 via-[var(--color-background)]/60 to-[var(--color-accent-jedi-blue)]/5 backdrop-blur-md cursor-pointer hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--card-accent)]/60 flex flex-col h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] max-h-[500px]"
      style={{ "--card-accent": style.accent }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        type: "spring",
        stiffness: 120,
      }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(certificate)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(certificate);
        }
      }}
    >
      {/* Corner accents */}
      <span className="pointer-events-none absolute top-0 left-0 w-5 h-5 border-t border-l border-[var(--card-accent)]/60 rounded-tl" />
      <span className="pointer-events-none absolute top-0 right-0 w-5 h-5 border-t border-r border-[var(--card-accent)]/60 rounded-tr" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[var(--card-accent)]/40 rounded-bl" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[var(--card-accent)]/40 rounded-br" />

      <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
        {image ? (
          <img
            src={image}
            loading="lazy"
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--card-accent)]/15 to-transparent font-mono text-[9px] sm:text-[10px] text-[var(--color-text-primary)]/40 tracking-wider">
            NO IMAGE
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 sm:gap-2">
          <span
            className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full border ${style.badge} ${style.text} backdrop-blur-sm`}
          >
            {category}
          </span>
        </div>
        {level && (
          <div
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-sm sm:text-base drop-shadow"
            title={levelInfo.label}
          >
            <span className={levelInfo.color}>{levelInfo.icon}</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <div className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] sm:text-[10px] tracking-wider flex items-center gap-1.5 sm:gap-2">
              <FaEye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> VER DETALLES
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-3 sm:gap-4 relative min-h-0 flex-1">
        <div className="space-y-1 sm:space-y-1.5 flex-shrink-0">
          <h3 className="relative text-sm sm:text-[15px] font-semibold leading-tight sm:leading-snug text-[var(--color-text-primary)] line-clamp-2 pr-2 sm:pr-4">
            <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--card-accent)] group-hover:to-[var(--color-accent-jedi-green)] transition-colors duration-500">
              {title}
            </span>
            <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[var(--card-accent)] to-transparent transition-all duration-700" />
          </h3>
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[var(--color-text-primary)]/55">
            <span className="flex items-center gap-1 truncate flex-1 mr-2">
              <FaGraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
              <span className="truncate">{provider}</span>
            </span>
            <span className="flex-shrink-0">{date}</span>
          </div>
        </div>
        {description && (
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-[var(--color-text-primary)]/65 line-clamp-2 flex-shrink-0">
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-[24px] sm:min-h-[30px] flex-grow items-start content-start">
          {duration && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-[var(--color-text-primary)]/70 flex-shrink-0">
              <FaClock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {duration}
            </span>
          )}
          {displayedSkills.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-[var(--color-accent-jedi-green)]/10 text-[var(--color-accent-jedi-green)] border border-[var(--color-accent-jedi-green)]/25 text-[9px] sm:text-[10px] font-mono tracking-wide flex-shrink-0"
            >
              {s.length > 8 ? `${s.slice(0, 8)}...` : s}
            </span>
          ))}
          {(skills.length > 3 || extra > 0) && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-white/5 text-[var(--color-text-primary)]/50 border border-white/10 text-[9px] sm:text-[10px] font-mono flex-shrink-0">
              +{Math.max(extra, skills.length - 3)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2 sm:pt-3 border-t border-white/5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono flex-shrink-0">
          <div className="flex items-center gap-1 text-[var(--color-accent-jedi-green)]/90">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-jedi-green)] opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[var(--color-accent-jedi-green)]" />
            </span>
            <span className="tracking-wide">VERIFICADO</span>
          </div>
          <span className="text-[var(--color-text-primary)]/45 tracking-wider">
            PDF
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
