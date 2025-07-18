import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaJava, FaLinode} from 'react-icons/fa';
import Button from './Button';
import './ProjectCard.css';
import {
    SiPostgresql, SiTailwindcss, SiMongodb,
    SiDjango, SiPython, SiMysql, SiSpringboot, SiAxios, SiJunit5,
    SiJsonwebtokens, SiCssdesignawards, SiPostman, SiOracle
} from 'react-icons/si';

import{
    GiAngularSpider
}from 'react-icons/gi';

import{
    TbBrandVite, TbBrandJavascript
} from 'react-icons/tb';

// Mapeo de tecnologías a íconos
const techIcons = {
    React: <FaReact className="text-cyan-400 text-2xl md:text-3xl" />,
    Node: <FaNodeJs className="text-green-500 text-2xl md:text-3xl" />,
    PostgreSQL: <SiPostgresql className="text-blue-400 text-2xl md:text-3xl" />,
    MongoDB: <SiMongodb className="text-green-600 text-2xl md:text-3xl" />,
    Django: <SiDjango className="text-green-800 text-2xl md:text-3xl" />,
    Tailwind: <SiTailwindcss className="text-sky-400 text-2xl md:text-3xl" />,
    Git: <FaGitAlt className="text-orange-500 text-2xl md:text-3xl" />,
    SQL: <FaDatabase className="text-gray-300 text-2xl md:text-3xl" />,
    Python: <SiPython className="text-yellow-300 text-2xl md:text-3xl" />,
    Javascript: <TbBrandJavascript className="text-yellow-300 text-2xl md:text-3xl" />,
    Tkinter: <SiPython className="text-blue-500 text-2xl md:text-3xl" />,
    Pytest: <SiPython className="text-purple-500 text-2xl md:text-3xl" />,
    Java:<FaJava className="text-red-600 text-2xl md:text-3xl" />,
    MySQL: <SiMysql className="text-blue-600 text-2xl md:text-3xl" />,
    SpringBoot: <SiSpringboot className="text-green-700 text-2xl md:text-3xl" />,
    Axios: <SiAxios className="text-purple-600 text-2xl md:text-3xl" />,
    Junit: <SiJunit5 className="text-yellow-500 text-2xl md:text-3xl" />,
    JWT: <SiJsonwebtokens className="text-red-500 text-2xl md:text-3xl" />,
    Vite: <TbBrandVite className="text-purple-500 text-2xl md:text-3xl" />,
    Node: <FaNodeJs className="text-green-500 text-2xl md:text-3xl" />,
    Angular: <GiAngularSpider className="text-red-600 text-2xl md:text-3xl" />,
    Css: <SiCssdesignawards className="text-purple-500 text-2xl md:text-3xl" />,
    Postman: <SiPostman className="text-orange-500 text-2xl md:text-3xl" />,
    Oracle: <SiOracle className="text-blue-500 text-2xl md:text-3xl" />
};

const ProjectCard = ({ project }) => {
    const techList = typeof project.technologies === 'string'
        ? project.technologies.split(',').map(t => t.trim())
        : project.technologies || [];

    return (
        <motion.div
            className="hologram-effect project-card-enhanced relative rounded-lg overflow-hidden p-6 backdrop-blur-sm transform transition-all duration-300 ease-in-out group h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px var(--color-accent-jedi-blue), 0 0 50px var(--color-accent-jedi-green)",
                y: -5, // Lift effect
            }}
        >
            <h3 className="text-2xl font-display mb-3">
                {project.title}
            </h3>

            <p className="font-sans text-text-light mb-4">{project.description}</p>

            {/* Tecnologías visibles al fondo sin overlay */}
            <div className="mt-6 border-t border-accent-cyan/30 pt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
               <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Tech Stack</h2>
                <div className="flex flex-wrap justify-start gap-3">
                    {techList.map((tech, index) => (
                        <div key={index} className="tech-icon-container">
                            <div className="tech-icon">{techIcons[tech]}</div>
                            <span className="tech-name">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones holográficos con efecto escáner */}
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6 relative z-20 flex-wrap">
                <Button
                    as={Link}
                    to={`/projects/${project.id}`}
                    className="w-full md:w-auto border-[var(--color-accent-sith-red)] text-[var(--color-accent-sith-red)] hover:bg-[var(--color-accent-sith-red)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-sith-red)] hover:shadow-[0_0_30px_var(--color-accent-sith-red)]"
                >
                    Ver Detalles
                </Button>
                {project.liveUrl && (
                    <Button
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-fit border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]"
                    >
                        Ver Demo
                    </Button>
                )}
                {project.githubUrl && (
                    <Button
                        as="a"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]"
                        icon={<FaGithub />}
                    >
                        Ver Repositorio Backend
                    </Button>
                )}
                {project.frontendUrl && (
                    <Button
                        as="a"
                        href={project.frontendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-fit border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]"
                        icon={<FaGithub />}
                    >
                        Ver Repositorio Frontend
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;