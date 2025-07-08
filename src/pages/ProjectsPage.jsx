// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectCardSkeleton from '../components/ui/ProjectCardSkeleton';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects/`)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener los proyectos:", error);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.3
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <motion.section
                id="proyectos"
                className="py-20 px-6 md:px-12 container mx-auto section-card-style"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-display text-center mb-16 lightsaber-underline text-[var(--color-text-primary)]"
                    variants={titleVariants}
                >
                    HOLOCRONES DE PROYECTOS
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            id="proyectos"
            className="py-24 px-4 container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                className="text-4xl md:text-5xl font-display text-center mb-6 lightsaber-underline text-[var(--color-text-primary)]"
                variants={titleVariants}
            >
                Proyectos de la Galaxia
            </motion.h2>
            <motion.p
                className="text-lg md:text-xl font-sans text-[var(--color-text-primary)] text-center max-w-3xl mx-auto mb-12"
                variants={titleVariants}
            >
                Aquí encontrarás una selección de mis proyectos más destacados, cada uno representando un desafío superado y una oportunidad para aplicar tecnologías innovadoras. Explora las soluciones que he construido.
            </motion.p>

            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <motion.p
                    className="text-center font-sans text-[var(--color-text-muted)] text-lg mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    No se encontraron proyectos registrados en esta estrella.
                </motion.p>
            )}
        </motion.section>
    );
};

export default ProjectsPage;
