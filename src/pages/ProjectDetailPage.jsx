import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { FaGithub } from 'react-icons/fa';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = () => {
      try {
        const foundProject = projectsData.find(p => p.id === parseInt(id));
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Proyecto no encontrado.");
        }
      } catch (err) {
        console.error("Error loading project details from JSON:", err);
        setError("Error al cargar los detalles del proyecto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-[var(--color-accent-jedi-blue)] font-sans text-xl animate-pulse">
        Cargando detalles del proyecto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-500 font-sans text-xl">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-[var(--color-text-muted)] font-sans text-xl">
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/projects" className="inline-flex items-center text-[var(--color-accent-jedi-blue)] hover:text-[var(--color-accent-jedi-green)] transition duration-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Volver a Proyectos
      </Link>

      <h1 className="text-4xl md:text-5xl font-display text-center mb-8 lightsaber-underline animated-text-ray">
        {project.title}
      </h1>

      <div className="bg-[var(--color-background)]/70 p-8 rounded-lg shadow-xl border-2 border-[var(--color-accent-jedi-blue)]/40 space-y-6">
        {project.imageUrl && (
          <img src={project.imageUrl} alt={project.title} className="w-full h-auto rounded-md mb-6 shadow-lg" loading="lazy" />
        )}

        <p className="text-lg leading-relaxed text-[var(--color-text-primary)]">
          {project.description}
        </p>

        {project.technologies && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-accent-jedi-green)] drop-shadow-[0_0_8px_var(--color-accent-jedi-green)]">Tecnologías Utilizadas:</h2>
            <div className="flex flex-wrap gap-3">
              {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',').map(t => t.trim())).map((tech, index) => (
                <span key={index} className="bg-[var(--color-accent-jedi-blue)]/20 text-[var(--color-accent-jedi-blue)] px-3 py-1 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6 relative z-20 flex-wrap">
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
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
