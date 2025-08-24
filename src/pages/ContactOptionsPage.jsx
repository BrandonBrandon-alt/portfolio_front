import React from "react";
import usePageMeta from "../hooks/usePageMeta";
import { motion } from "framer-motion";
import ContactFormSection from "../components/sections/ContactFormSection";
import ContactChannelCard from "../components/ui/ContactChannelCard";
import {
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import { itemVariants } from "../styles/animations";
import HolographicContainer from "../components/ui/HolographicContainer";

const channels = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/brandon-montealegre-acevedo-68bab0254/",
    icon: <FaLinkedin />,
    tone: "#0A66C2",
    description:
      "Conecta profesionalmente, revisa mi trayectoria y avala habilidades.",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/573153033412",
    icon: <FaWhatsapp />,
    tone: "#25D366",
    description: "Contacto rápido para coordinación y soporte inmediato.",
  },
  {
    label: "Correo",
    href: "mailto:brandonmontealegre15@gmail.com",
    icon: <FaEnvelope />,
    tone: "#EA4335",
    description: "Consultas formales, propuestas y documentación detallada.",
  },
  {
    label: "GitHub",
    href: "https://github.com/BrandonBrandon-alt",
    icon: <FaGithub />,
    tone: "#ffffff",
    description: "Código fuente, contribuciones y proyectos activos.",
  },
  {
    label: "Portafolio",
    href: "/projects",
    icon: <FaGlobe />,
    tone: "#00f0ff",
    description: "Explora más trabajos y casos de estudio en detalle.",
  },
];

const ContactOptionsPage = () => {
  usePageMeta({
    title: "Contacto",
    description:
      "Canales de contacto de Brandon Montealegre: LinkedIn, WhatsApp, correo y formulario profesional.",
  });

  return (
    <HolographicContainer
      maxWidth="6xl"
      particleCount={16}
      gridColumns={8}
      showGrid={true}
      showParticles={true}
      cornerVariant="blue"
      innerPadding="py-8 sm:py-12 md:py-16"
      className="flex flex-col items-center"
    >
      {/* Encabezado */}
      <motion.header
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mb-24 relative"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <span className="text-[10px] tracking-[0.35em] font-mono px-4 py-1 rounded-full border border-[var(--color-accent-jedi-blue)]/40 text-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)]/10 shadow-[0_0_0_1px_rgba(0,240,255,0.2)]">
              [ CONTACT CHANNELS ]
            </span>
            <span className="text-[10px] tracking-[0.35em] font-mono px-4 py-1 rounded-full border border-[var(--color-accent-jedi-green)]/40 text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10">
              LIVE
            </span>
          </div>
          <h1 className="holo-title text-4xl md:text-5xl">
            CANALES DE CONTACTO
          </h1>
          <p className="holo-lead mt-8 max-w-3xl mx-auto">
            Elige el canal que mejor se adapte a tu propósito: colaboración,
            propuestas formales, soporte o networking. Todos los caminos abren
            una nueva conversación.
          </p>
        </div>
        {/* Decorativo de fondo */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]">
          <div className="absolute -top-32 -left-10 w-96 h-96 bg-[var(--color-accent-jedi-blue)] blur-[120px] rounded-full" />
          <div className="absolute -bottom-40 -right-10 w-[30rem] h-[30rem] bg-[var(--color-accent-jedi-green)] blur-[150px] rounded-full" />
        </div>
      </motion.header>

      {/* Formulario principal */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <ContactFormSection />
      </motion.div>

      {/* Separador escaneo */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl my-24"
      >
        <div className="relative h-px bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[scanSlide_3.2s_linear_infinite]" />
        </div>
      </motion.div>

      {/* Canales alternativos */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="w-full max-w-6xl mb-24"
        aria-labelledby="alt-channels-title"
      >
        <div className="text-center mb-14">
          <h2
            id="alt-channels-title"
            className="text-xl font-mono tracking-[0.4em] text-[var(--color-accent-jedi-green)] mb-4"
          >
            [ CANALES ALTERNATIVOS ]
          </h2>
          <p className="text-sm font-mono tracking-wider text-[var(--color-text-primary)]/60">
            DIFUSIÓN · RESPUESTA RÁPIDA · FORMAL · CÓDIGO · EXPLORACIÓN
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {channels.map((c) => (
            <ContactChannelCard key={c.label} {...c} />
          ))}
        </div>
        <div className="mt-14 text-center font-mono text-xs tracking-widest text-[var(--color-text-primary)]/35">
          [ FIN CANALES ]
        </div>
      </motion.section>
    </HolographicContainer>
  );
};

export default ContactOptionsPage;
