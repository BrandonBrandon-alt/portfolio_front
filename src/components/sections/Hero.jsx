import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "./particles-config";
import Button from "../ui/Button";
import "../../styles/HeroTextAnimation.css";
import { containerVariants, itemVariants } from '../../styles/animations';

const Hero = () => {
    const [particlesContainer, setParticlesContainer] = useState(null);
    const [isHyperspace, setIsHyperspace] = useState(false);

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        setParticlesContainer(container);
    }, []);

    const toggleHyperspace = useCallback((enable) => {
        if (!particlesContainer) return;

        particlesContainer.loadOptions({
            particles: {
                move: {
                    speed: enable ? 200 : 3, // Mucho más rápido en hiperespacio
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "bounce",
                    },
                },
                shape: {
                    type: enable ? "line" : "circle", // Estirar a líneas en hiperespacio
                },
                size: {
                    value: enable ? { min: 1, max: 5 } : { min: 1, max: 3 },
                },
                links: {
                    enable: !enable, // Deshabilitar enlaces en hiperespacio
                },
                opacity: {
                    value: enable ? 0.5 : 0.7,
                },
            },
        });
        setIsHyperspace(enable);
    }, [particlesContainer]);

    useEffect(() => {
        // Activar hiperespacio al cargar la página por un corto tiempo
        const timeout = setTimeout(() => {
            toggleHyperspace(true);
            setTimeout(() => toggleHyperspace(false), 1000); // Duración del efecto
        }, 500); // Retraso inicial

        return () => clearTimeout(timeout);
    }, [toggleHyperspace]);

    // Opcional: Activar hiperespacio al hacer scroll hacia arriba rápidamente
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < lastScrollY && currentScrollY < 50 && !isHyperspace) { // Si sube y está cerca del top
                toggleHyperspace(true);
                setTimeout(() => toggleHyperspace(false), 1000);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHyperspace, toggleHyperspace]);

    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-[var(--color-background)]">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesOptions}
                className="absolute inset-0 z-0"
            />

            <motion.div
                className="text-center p-4 relative z-10 backdrop-blur-sm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-display text-[var(--color-text-primary)] mb-4 relative inline-block lightsaber-underline drop-shadow-[0_0_15px_#0ff] animated-text-ray"
                    variants={itemVariants}
                >
                    BRANDON MONTEALEGRE
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl font-sans text-[var(--color-text-primary)] mt-4 drop-shadow-[0_0_5px_#0ff]"
                    variants={itemVariants}
                >
                    Desarrollador Full Stack | Creando Experiencias del Futuro
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-col md:flex-row justify-center gap-4"
                    variants={itemVariants}
                >
                    <Button as="a" href="/projects" className="border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_10px_var(--color-accent-jedi-green)] hover:shadow-[0_0_20px_var(--color-accent-jedi-green)]">
                        Explorar Proyectos
                    </Button>
                    <Button as="a" href="/contact" className="border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_10px_var(--color-accent-jedi-green)] hover:shadow-[0_0_20px_var(--color-accent-jedi-green)]">
                        Contactar
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
