import React from 'react';
import { motion } from 'framer-motion';
import {
  SiAxios,
  SiCypress,
  SiDjango,
  SiEslint,
  SiGradle,
  SiHibernate,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiOracle,
  SiPodman,
  SiPostgresql,
  SiPostman,
  SiReactrouter, SiSonarqube,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiVite,
  SiVitest
} from "react-icons/si";
import {FaAngular, FaCss3, FaDatabase, FaDocker, FaGitAlt, FaJava, FaNodeJs, FaPython, FaReact} from "react-icons/fa";
import { containerVariants, itemVariants } from '../../styles/animations';

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
  { name: 'Spring Security', icon: SiSpringsecurity, color: 'green-600' },
  { name: 'JPA (Hibernate)', icon: SiHibernate, color: 'gray-500' },
  { name: 'MySQL', icon: SiMysql, color: 'blue-700' },
  { name: 'Gradle', icon: SiGradle, color: 'teal-500' },
  { name: 'Vitest', icon: SiVitest, color: 'yellow-600' },
  { name: 'Cypress', icon: SiCypress, color: 'teal-400' },
  { name: 'ESLint', icon: SiEslint, color: 'indigo-500' },
  { name: 'React Router', icon: SiReactrouter, color: 'red-500' },
  { name: 'Axios', icon: SiAxios, color: 'purple-600' },
  { name: 'CSS', icon: FaCss3, color: 'blue-500' },
  { name: 'SonarQube', icon: SiSonarqube, color: 'yellow-500' },
];

// Tailwind CSS JIT compiler needs to see the full class names.
const colorClasses = {
  'cyan-400': 'text-cyan-400',
  'green-500': 'text-green-500',
  'yellow-300': 'text-yellow-300',
  'green-800': 'text-green-800',
  'sky-400': 'text-sky-400',
  'green-600': 'text-green-600',
  'gray-300': 'text-gray-300',
  'orange-500': 'text-orange-500',
  'red-500': 'text-red-500',
  'yellow-400': 'text-yellow-400',
  'blue-500': 'text-blue-500',
  'blue-600': 'text-blue-600',
  'blue-400': 'text-blue-400',
  'orange-400': 'text-orange-400',
  'red-600': 'text-red-600',
  'gray-400': 'text-gray-400',
  'red-700': 'text-red-700',
  'green-700': 'text-green-700',
  'purple-500': 'text-purple-500',
  'gray-500': 'text-gray-500',
  'blue-700': 'text-blue-700',
  'teal-500': 'text-teal-500',
  'yellow-600': 'text-yellow-600',
  'teal-400': 'text-teal-400',
  'indigo-500': 'text-indigo-500',
  'purple-600': 'text-purple-600',
};

const SkillsSection = ({ isStandalonePage = false }) => {
  const sectionClasses = isStandalonePage
    ? "py-20 px-4 container mx-auto text-center section-card-style"
    : "py-20 px-4 container mx-auto text-center section-card-style";

  return (
      <motion.section
          className={sectionClasses}
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-h-[500px] overflow-y-auto p-4">
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
                      boxShadow: 'none',
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                >
                  <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`text-5xl ${colorClasses[skill.color] || 'text-gray-300'} mb-4`}
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
