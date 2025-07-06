import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from 'react-icons/fa';
import Button from './Button';
import './ProjectCard.css';
import {
    SiPostgresql, SiTailwindcss, SiMongodb,
    SiDjango, SiPython, SiJavascript
} from 'react-icons/si';

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
    Javascript: <SiJavascript className="text-yellow-300 text-2xl md:text-3xl" />,
};

const ProjectCard = ({ project }) => {
    const techList = typeof project.technologies === 'string'
        ? project.technologies.split(',').map(t => t.trim())
        : project.technologies || [];

    return (
        <motion.div
            className="project-card-enhanced relative rounded-lg overflow-hidden p-6 backdrop-blur-sm transform transition-all duration-300 ease-in-out group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(0, 229, 255, 0.8), 0 0 50px rgba(0, 229, 255, 0.5)",
                y: -5, // Lift effect
            }}
        >
            <h3 className="text-2xl font-display text-accent-cyan mb-3">
                {project.title}
            </h3>

            <p className="font-sans text-text-light mb-4">{project.description}</p>

            {/* Tecnologías visibles al fondo sin overlay */}
            <div className="mt-6 border-t border-accent-cyan/30 pt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-accent-magenta mb-2 font-semibold">
                    Tecnologías:
                </p>
                <div className="flex flex-wrap justify-start gap-3">
                    {techList.map((tech, index) => (
                        <div key={index} className="tooltip" title={tech}>
                            {techIcons[tech] || (
                                <span className="text-white text-sm">{tech}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones holográficos con efecto escáner */}
            <div className="flex justify-end gap-4 mt-6 relative z-20">
                {project.project_url && (
                    <Button
                        as="a"
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)]"
                    >
                        Ver Demo
                    </Button>
                )}
                {project.repository_url && (
                    <Button
                        as="a"
                        href={project.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]"
                    >
                        Ver Código
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;