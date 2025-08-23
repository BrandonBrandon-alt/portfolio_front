import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/brandon-montealegre-acevedo-68bab0254/",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    href: "https://wa.me/573153033412",
    label: "WhatsApp",
    icon: <FaWhatsapp className="w-5 h-5" />,
  },
  {
    href: "mailto:brandonmontealegre15@gmail.com",
    label: "Correo Electrónico",
    icon: <FaEnvelope className="w-5 h-5" />,
  },
  {
    href: "https://github.com/BrandonBrandon-alt",
    label: "GitHub",
    icon: <FaGithub className="w-5 h-5" />,
  },
];

const Footer = ({ children }) => {
  const [openSection, setOpenSection] = React.useState(null);
  const toggle = (key) => setOpenSection((prev) => (prev === key ? null : key));
  const isMobile = useMediaQuery("(max-width: 639px)");

  const lastToggledRef = useRef(null);

  // Close accordion sections automatically when switching to desktop view
  useEffect(() => {
    if (!isMobile) {
      setOpenSection(null);
    }
  }, [isMobile]);

  // When a section opens, move focus to its first interactive element for accessibility
  useEffect(() => {
    if (!isMobile || !openSection) return;
    const panelId =
      openSection === "nav"
        ? "footer-nav"
        : openSection === "contact"
        ? "footer-contact"
        : null;
    if (panelId) {
      const panel = document.getElementById(panelId);
      if (panel) {
        const focusable = panel.querySelector(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
          // Delay a frame to ensure rendering
          requestAnimationFrame(() => focusable.focus());
        }
      }
    }
  }, [openSection, isMobile]);
  return (
    <motion.footer
      className="relative mt-32 border-t border-[var(--color-accent-jedi-blue)]/25 bg-[linear-gradient(135deg,rgba(10,18,28,0.92),rgba(10,18,28,0.78))] backdrop-blur-xl text-[var(--color-text-primary)] overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-labelledby="footer-title"
    >
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <div className="absolute -top-32 -left-10 w-[30rem] h-[30rem] bg-[var(--color-accent-jedi-blue)] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-18rem] right-[-6rem] w-[34rem] h-[34rem] bg-[var(--color-accent-jedi-green)] blur-[180px] rounded-full" />
      </div>

      {/* Línea scan superior */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent overflow-hidden">
        <span className="absolute inset-0 -translate-x-full animate-[scanSlide_5s_linear_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid gap-16 md:gap-12 md:grid-cols-12">
          {/* Brand / Intro */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2
              id="footer-title"
              className="font-mono tracking-[0.35em] text-[10px] text-[var(--color-accent-jedi-green)] mb-5"
            >
              [ BRAN_DEV_CORE ]
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/70 max-w-xs mb-6">
              Desarrollo soluciones escalables enfocadas en performance,
              accesibilidad y experiencias futuristas con identidad técnica
              clara.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[var(--color-accent-jedi-blue)]/70">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-jedi-green)] animate-pulse" />
              LIVE_SYSTEM_CHANNEL
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-4 lg:col-span-3">
            <button
              type="button"
              onClick={() => toggle("nav")}
              className="w-full sm:w-auto flex items-center justify-between font-mono tracking-[0.3em] text-[11px] text-[var(--color-accent-jedi-blue)] mb-4 sm:mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-green)]/70 rounded"
              aria-expanded={openSection === "nav"}
              aria-controls="footer-nav"
              aria-label={`Sección navegación ${
                openSection === "nav" ? "colapsada" : "expandida"
              }`}
            >
              <span>[ NAVEGACION ]</span>
              {isMobile && (
                <span
                  className="text-xs ml-2 font-sans tracking-normal"
                  aria-hidden="true"
                >
                  {openSection === "nav" ? "−" : "+"}
                </span>
              )}
            </button>
            <motion.ul
              id="footer-nav"
              initial={false}
              animate={{
                height: !isMobile || openSection === "nav" ? "auto" : 0,
                opacity: !isMobile || openSection === "nav" ? 1 : 0,
              }}
              className="space-y-2 overflow-hidden will-change-[height,opacity]"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              aria-hidden={isMobile ? openSection !== "nav" : false}
            >
              {[
                { to: "/", label: "Inicio" },
                { to: "/projects", label: "Proyectos" },
                { to: "/about", label: "Acerca de" },
                { to: "/contact", label: "Contacto" },
                { to: "/skills", label: "Habilidades" },
                { to: "/certificates", label: "Certificados" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group text-sm text-[var(--color-text-primary)]/60 hover:text-[var(--color-accent-jedi-green)] transition-colors inline-flex items-center gap-2"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)]" />
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contacto directo */}
          <div className="md:col-span-3 lg:col-span-3">
            <button
              type="button"
              onClick={() => toggle("contact")}
              className="w-full sm:w-auto flex items-center justify-between font-mono tracking-[0.3em] text-[11px] text-[var(--color-accent-jedi-blue)] mb-4 sm:mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-green)]/70 rounded"
              aria-expanded={openSection === "contact"}
              aria-controls="footer-contact"
              aria-label={`Sección contacto ${
                openSection === "contact" ? "colapsada" : "expandida"
              }`}
            >
              <span>[ CONTACTO ]</span>
              {isMobile && (
                <span
                  className="text-xs ml-2 font-sans tracking-normal"
                  aria-hidden="true"
                >
                  {openSection === "contact" ? "−" : "+"}
                </span>
              )}
            </button>
            <motion.ul
              id="footer-contact"
              initial={false}
              animate={{
                height: !isMobile || openSection === "contact" ? "auto" : 0,
                opacity: !isMobile || openSection === "contact" ? 1 : 0,
              }}
              className="space-y-3 text-sm overflow-hidden will-change-[height,opacity]"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              aria-hidden={isMobile ? openSection !== "contact" : false}
            >
              <li>
                <a
                  href="tel:+573153033412"
                  className="hover:text-[var(--color-accent-jedi-green)] text-[var(--color-text-primary)]/70 transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-jedi-green)]/60" />{" "}
                  +57 315 303 3412
                </a>
              </li>
              <li>
                <a
                  href="mailto:brandonmontealegre15@gmail.com"
                  className="hover:text-[var(--color-accent-jedi-green)] text-[var(--color-text-primary)]/70 transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-jedi-green)]/60" />{" "}
                  brandonmontealegre15@gmail.com
                </a>
              </li>
            </motion.ul>
            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ href, label, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="relative group w-11 h-11 rounded-xl border border-[var(--color-accent-jedi-blue)]/30 flex items-center justify-center text-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)]/10 overflow-hidden transition-colors hover:text-[var(--color-background)]"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/20 via-transparent to-[var(--color-accent-jedi-green)]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1000ms]" />
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Extra / Children slot */}
          <div className="md:col-span-12 lg:col-span-2 flex md:justify-end">
            {children && (
              <div className="w-full md:w-auto px-0 md:px-4">{children}</div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)]/40 to-transparent overflow-hidden">
            <span className="absolute inset-0 -translate-x-full animate-[scanSlide_6s_linear_infinite] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[10px] font-mono tracking-widest text-[var(--color-text-primary)]/45">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-jedi-green)] animate-pulse" />
                © {new Date().getFullYear()} BRAN/DEV
              </span>
              <span className="hidden sm:inline">•</span>https://www.redhat.com/
              <span>GALACTIC SOLUTIONS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-[var(--color-accent-jedi-green)] transition-colors cursor-pointer">
                TERMINOS
              </span>
              <span className="hover:text-[var(--color-accent-jedi-green)] transition-colors cursor-pointer">
                PRIVACIDAD
              </span>
              <span className="hover:text-[var(--color-accent-jedi-green)] transition-colors cursor-pointer">
                LICENCIAS
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
