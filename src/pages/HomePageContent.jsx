import React from "react";
import usePageMeta from "../hooks/usePageMeta";
import Hero from "../components/sections/Hero";
import AboutTeaser from "../components/sections/AboutTeaser";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectList from "../components/sections/ProjectList";
import Carousel from "../components/sections/CarouselImproved";
import { handlePDF, isMobile } from "../utils/pdfUtils";
import { useNotifications } from "../contexts/NotificationContext";

const HomePageContent = () => {
  const notifications = useNotifications();

  // Configurar meta tags
  usePageMeta({
    title: "Inicio",
    description:
      "Portafolio de Brandon Montealegre: proyectos destacados, habilidades y contacto profesional.",
  });

  // Función optimizada para abrir CV
  const openCV = () => {
    console.info("[HomePageContent] Opening CV PDF");

    const result = handlePDF("/hoja_brandon.pdf", {
      filename: "Brandon_Montealegre_CV.pdf",
      preferDownload: isMobile(),
      allowSameTab: false, // No permitir same tab para CV
      showFeedback: true,
      onComplete: (result) => {
        if (result.success) {
          if (
            result.action === "download" ||
            result.action === "download_fallback"
          ) {
            notifications.showSuccess("Descargando CV...", { duration: 3000 });
          } else if (result.newTab) {
            notifications.showSuccess("CV abierto en nueva pestaña", {
              duration: 3000,
            });
          } else {
            notifications.showInfo("Procesando CV...", { duration: 3000 });
          }
        } else {
          notifications.showError(
            "No se pudo procesar el CV. Intente nuevamente.",
            { duration: 5000 }
          );
        }
      },
      onError: (error) => {
        console.error("[HomePageContent] CV error:", error);
        notifications.showError(`Error al procesar el CV: ${error.message}`, {
          duration: 5000,
        });
      },
    });

    // Log para debugging
    console.info(
      `[HomePageContent] CV procesado - Action: ${result.action}, Method: ${result.method}, Success: ${result.success}`
    );
  };

  const ctaSlides = [
    {
      title: "Listo para tu Próximo Proyecto?",
      description:
        "Hablemos sobre cómo puedo ayudarte a construir la solución perfecta.",
      button: {
        text: "Contactar Ahora",
        as: "a",
        href: "/contact",
        className:
          "border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]",
      },
      secondaryButton: {
        text: isMobile() ? "Descargar CV" : "Ver Mi CV",
        as: "button",
        onClick: openCV,
        className:
          "border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]",
      },
    },
    {
      title: "Explora Mis Habilidades",
      description:
        "Descubre las tecnologías y herramientas que domino para tus proyectos.",
      button: {
        text: "Ver Habilidades",
        as: "a",
        href: "/skills",
        className:
          "border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]",
      },
    },
  ];

  return (
    <>
      {/* Passive prefetch hints for high-probability navigation targets */}
      <link rel="prefetch" href="/projects" as="document" />
      <link rel="prefetch" href="/skills" as="document" />
      <link rel="prefetch" href="/hoja_brandon.pdf" as="document" />

      <Hero />
      <div className="py-16">
        <AboutTeaser />
      </div>
      <div className="py-16">
        <Carousel slides={ctaSlides} />
      </div>
      <div className="py-16">
        <SkillsSection />
      </div>
      <div className="py-16">
        <ProjectList />
      </div>
    </>
  );
};

export default HomePageContent;
