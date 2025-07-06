import React from 'react';
import { motion } from 'framer-motion';
import {
  SiDjango,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb, SiOracle,
  SiPodman,
  SiPostgresql,
  SiPostman, SiSpringboot,
  SiTailwindcss, SiVite
} from "react-icons/si";
import {FaAngular, FaDatabase, FaDocker, FaGitAlt, FaJava, FaNodeJs, FaPython, FaReact} from "react-icons/fa";

const skills = [
  { name: 'React', icon: FaReact, color: 'cyan-400' },
  { name: 'Node.js', icon: FaNodeJs, color: 'green-500' },
  { name: 'Python', icon: FaPython, color: 'yellow-300' },
  { name: 'Django', icon: SiDjango, color: 'green-800' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'sky-400' },
  { name: 'MongoDB', icon: SiMongodb, color: 'green-600' },
  { name: 'SQL', icon: FaDatabase, color: 'gray-300' },
  { name: 'Git', icon: FaGitAlt, color: 'orange-500' },
  { name: 'Java', icon: FaJava, color: 'red-500' },
  { name: 'JavaScript', icon: SiJavascript, color: 'yellow-400' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'blue-500' },
  { name: 'Docker', icon: FaDocker, color: 'blue-600' },
  { name: 'Podman', icon: SiPodman, color: 'blue-400' },
  { name: 'Postman', icon: SiPostman, color: 'orange-400' },
  { name: 'Angular', icon: FaAngular, color: 'red-600' },
  { name: 'JWT', icon: SiJsonwebtokens, color: 'gray-400' },
  { name: 'Oracle', icon: SiOracle, color: 'red-700' },
  { name: 'Spring Boot', icon: SiSpringboot, color: 'green-700' },
  { name: 'Vite', icon: SiVite, color: 'purple-500' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SkillsSection = () => {
  return (
      <motion.section
          className="py-20 px-4 container mx-auto text-center mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
        <motion.h2
            className="text-4xl font-display text-[var(--color-text-primary)] mb-12 lightsaber-underline"
            variants={itemVariants}
        >
          MATRIZ DE COMPETENCIAS
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
                <motion.div
                    key={index}
                    className={`p-6 rounded-lg border-2 border-[var(--color-accent-jedi-blue)]/50 bg-[var(--color-background)]/40 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center hover:scale-105 transition-all duration-300`}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      rotate: 2,
                      borderColor: index % 2 === 0 ? 'var(--color-accent-jedi-blue)' : 'var(--color-accent-jedi-green)',
                      boxShadow: 'none', // Eliminar la sombra
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                >
                  <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`text-5xl text-${skill.color} mb-4`}
                  >
                    <IconComponent />
                  </motion.div>
                  <h3 className="text-xl font-sans font-bold">{skill.name}</h3>
                </motion.div>
            );
          })}
        </div>
      </motion.section>
  );
};

export default SkillsSection;
