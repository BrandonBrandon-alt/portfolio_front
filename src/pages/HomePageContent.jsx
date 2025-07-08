import React from 'react';
import Hero from '../components/sections/Hero';
import AboutTeaser from '../components/sections/AboutTeaser';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectList from '../components/sections/ProjectList'; // Import the ProjectList component
import Carousel from '../components/ui/Carousel'; // Import the Carousel component

const ctaSlides = [
  {
    title: "Listo para tu Próximo Proyecto?",
    description: "Hablemos sobre cómo puedo ayudarte a construir la solución perfecta.",
    button: {
      text: "Contactar Ahora",
      as: "a",
      href: "/contact",
      className: "border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]",
    },
    secondaryButton: {
      text: "Ver Mi CV",
      as: "a",
      href: "/Brandon_Montealegre_CV.pdf", // Ruta directa al PDF en la carpeta public
      className: "border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]",
    },
  },
  {
    title: "Explora Mis Habilidades",
    description: "Descubre las tecnologías y herramientas que domino para tus proyectos.",
    button: {
      text: "Ver Habilidades",
      as: "a",
      href: "/skills", // Ahora apunta a la página de habilidades
      className: "border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]",
    },
  },
];

const HomePageContent = () => {
  return (
    <>
      <Hero />
        <Carousel slides={ctaSlides} />
      <div className="py-10">
        <AboutTeaser />
      </div>
      <div className="py-10">
        <SkillsSection />
      </div>
      <div className="py-10">
        <ProjectList />
      </div>
    </>
  );
};

export default HomePageContent;