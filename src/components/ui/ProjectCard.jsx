import React from 'react';
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            className="relative bg-[var(--color-background)]/50 border border-[var(--color-accent-jedi-blue)]/30 rounded-2xl overflow-hidden p-6 shadow-lg backdrop-blur-md group transition-all duration-300 hover:shadow-[0_0_20px_var(--color-accent-jedi-blue)]"
            whileHover={{ scale: 1.03 }}
        >
            {/* Título */}
            <motion.h3
                className="text-2xl font-display text-[var(--color-accent-jedi-blue)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {project.title || project.name}
            </motion.h3>

            {/* Descripción */}
            <motion.p
                className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {project.description}
            </motion.p>

            {/* Tecnologías */}
            <motion.div
                className="mb-4 px-4 py-2 bg-white/5 border border-[var(--color-accent-jedi-green)]/30 rounded-lg text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-[var(--color-accent-jedi-green)] font-semibold">Tecnologías:</p>
                <p className="text-[var(--color-text-primary)] opacity-80">{project.technologies || project.tech_stack}</p>
            </motion.div>

            {/* Enlaces */}
            <motion.div
                className="flex justify-end gap-3 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {(project.project_url || project.demo_url) && (
                    <a
                        href={project.project_url || project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-md border border-[var(--color-accent-magenta)] text-[var(--color-accent-magenta)] hover:bg-[var(--color-accent-magenta)] hover:text-[var(--color-background)] transition-all duration-300"
                    >
                        <FaExternalLinkAlt />
                        Demo
                    </a>
                )}
                {(project.repository_url || project.repo_url) && (
                    <a
                        href={project.repository_url || project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-md border border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-300"
                    >
                        <FaCodeBranch />
                        Código
                    </a>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
