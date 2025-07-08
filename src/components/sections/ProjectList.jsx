// src/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../ui/ProjectCard'; // Import ProjectCard

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects/`)
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los proyectos:", error);
            });
    }, []);

    return (
        <section className="py-20 px-6 section-card-style text-[var(--color-text-primary)]">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 border-b-4 border-[var(--color-accent-jedi-blue)] inline-block">Mis Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default ProjectList;
