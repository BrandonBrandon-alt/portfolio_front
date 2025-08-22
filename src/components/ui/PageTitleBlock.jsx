import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable page title block replicating the ContactOptionsPage header style.
 * Props:
 *  - title: main heading text
 *  - lead: optional descriptive paragraph
 *  - badges: [{ text: string, variant?: 'blue'|'green'|'neutral', live?: boolean }]
 *  - as: heading element tag (h1|h2...), default h1
 *  - className: extra classes for wrapper
 *  - decor: boolean to show background gradient blobs
 */
const badgeColorMap = {
  blue: {
    text: "text-[var(--color-accent-jedi-blue)]",
    border: "border-[var(--color-accent-jedi-blue)]/40",
    bg: "bg-[var(--color-accent-jedi-blue)]/10",
  },
  green: {
    text: "text-[var(--color-accent-jedi-green)]",
    border: "border-[var(--color-accent-jedi-green)]/40",
    bg: "bg-[var(--color-accent-jedi-green)]/10",
  },
  neutral: {
    text: "text-[var(--color-text-primary)]/70",
    border: "border-[var(--color-ui-border)]",
    bg: "bg-[var(--color-ui-border)]/30",
  },
};

export default function PageTitleBlock({
  title,
  lead,
  badges = [],
  as: HeadingTag = "h1",
  className = "",
  decor = true,
  id,
}) {
  return (
    <motion.header
      className={`w-full max-w-5xl mx-auto mb-24 relative ${className}`}
      layout
    >
      <div className="text-center mb-8">
        {badges.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            {badges.map((b, idx) => {
              const colors = badgeColorMap[b.variant || "blue"];
              return (
                <span
                  key={idx}
                  className={`text-[10px] tracking-[0.35em] font-mono px-4 py-1 rounded-full border ${colors.border} ${colors.text} ${colors.bg} shadow-[0_0_0_1px_rgba(255,255,255,0.05)]`}
                >
                  {b.text}
                </span>
              );
            })}
          </div>
        )}
        <HeadingTag id={id} className="holo-title text-4xl md:text-5xl">
          {title}
        </HeadingTag>
        {lead && <p className="holo-lead mt-8 max-w-3xl mx-auto">{lead}</p>}
      </div>
      {decor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        >
          <div className="absolute -top-32 -left-10 w-96 h-96 bg-[var(--color-accent-jedi-blue)] blur-[120px] rounded-full" />
          <div className="absolute -bottom-40 -right-10 w-[30rem] h-[30rem] bg-[var(--color-accent-jedi-green)] blur-[150px] rounded-full" />
        </div>
      )}
    </motion.header>
  );
}
