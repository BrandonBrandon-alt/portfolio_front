// src/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los proyectos:", error);
            });
    }, []);

    return (
        <section className="py-20 px-6 bg-[var(--color-background)] text-[var(--color-text-primary)]">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 border-b-4 border-[var(--color-accent-jedi-blue)] inline-block">Mis Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="bg-white/5 backdrop-blur-sm p-6 rounded-lg shadow-[0_0_10px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_20px_var(--color-accent-jedi-blue)] transition-all border border-white/10"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-[var(--color-accent-jedi-blue)]">{project.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{project.description}</p>
                        <p className="text-sm font-mono mb-4"><strong className="text-[var(--color-accent)]">Tecnologías:</strong> {project.technologies}</p>
                        <a
                            href={project.repository_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-auto px-4 py-2 bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] rounded-md font-semibold hover:brightness-125 transition"
                        >
                            Ver Código
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectList;
