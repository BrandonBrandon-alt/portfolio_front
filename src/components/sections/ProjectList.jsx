// src/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { containerVariants, itemVariants } from '../../styles/animations';
import projectsData from '../../data/projects.json';
import ProjectCard from '../ui/ProjectCard'; // Import ProjectCard

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(projectsData.slice(0, 3)); // Mostrar solo los primeros 3 proyectos
    }, []);

    return (
        <motion.section
            id="proyectos-destacados"
            className="py-20 px-6 section-card-style text-[var(--color-text-primary)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-3xl md:text-4xl font-display text-center mb-4 lightsaber-underline"
                variants={itemVariants}
            >
                PROYECTOS DESTACADOS
            </motion.h2>
            <motion.p
                className="text-lg md:text-xl font-sans text-center max-w-3xl mx-auto mb-12"
                variants={itemVariants}
            >
                Explora una selección de mis trabajos más recientes y significativos. Cada proyecto es una historia de innovación y solución de problemas.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <motion.div key={project.id} variants={itemVariants}>
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-12">
                <Link
                    to="/projects"
                    className="inline-block px-8 py-3 text-lg font-bold rounded-full border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-green)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)] transition-all duration-300"
                >
                    Ver Todos los Proyectos
                </Link>
            </motion.div>
        </motion.section>
    );
};

export default ProjectList;
