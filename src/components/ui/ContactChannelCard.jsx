import React from "react";
import { motion } from "framer-motion";

/**
 * ContactChannelCard
 * Tarjeta holográfica consistente para canales de contacto alternativos.
 * Props:
 *  - icon: ReactNode (ícono representativo)
 *  - label: string (nombre del canal)
 *  - href: string (URL o mailto:)
 *  - tone: string (css color brand principal)
 *  - description: string opcional
 */
const ContactChannelCard = ({
  icon,
  label,
  href,
  tone = "#00f0ff",
  description,
}) => {
  return (
    <motion.a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={`Canal de contacto: ${label}`}
      className="group relative block h-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent-jedi-green)]"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Borde / marco holográfico */}
      <div className="absolute inset-0 rounded-2xl border border-[var(--color-accent-jedi-blue)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/10 via-transparent to-[var(--color-accent-jedi-green)]/10 backdrop-blur-sm transition-all duration-500 group-hover:border-[var(--color-accent-jedi-green)]/60 group-hover:shadow-[0_0_34px_-6px_rgba(0,255,159,0.55)]" />
      {/* Glow dinámico */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,240,255,0.18),rgba(0,255,159,0.18),rgba(0,240,255,0.18))] blur" />
      {/* Barrido */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-[1400ms]" />

      {/* Contenido */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <span
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-[var(--color-accent-jedi-blue)]/40 bg-[var(--color-accent-jedi-blue)]/10 text-2xl shadow-[0_0_0_1px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-500"
            style={{ color: tone }}
          >
            {icon}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-jedi-blue)]/60">
            LIVE
          </span>
        </div>
        <h3 className="font-mono tracking-wider text-sm text-[var(--color-accent-jedi-green)] mb-1">
          {label.toUpperCase()}
        </h3>
        {description && (
          <p className="text-xs text-[var(--color-text-primary)]/70 leading-relaxed mb-4 flex-grow">
            {description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-2 text-[11px] font-mono tracking-wider text-[var(--color-accent-jedi-blue)] group-hover:text-[var(--color-accent-jedi-green)] transition-colors">
          <span>[ ABRIR ]</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-jedi-green)] animate-pulse" />
        </div>
      </div>
    </motion.a>
  );
};

export default ContactChannelCard;
