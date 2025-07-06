import React from 'react';
import Hero from '../components/sections/Hero';
import AboutTeaser from '../components/sections/AboutTeaser';
import SkillsSection from '../components/sections/SkillsSection'; // Importa SkillsSection

const HomePageContent = () => {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <SkillsSection /> {/* Añade SkillsSection aquí */}
    </>
  );
};

export default HomePageContent;