import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "./particles-config";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const Hero = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);

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
                    className="text-5xl md:text-7xl font-display text-[var(--color-text-primary)] mb-4 relative inline-block glitch lightsaber-underline drop-shadow-[0_0_15px_#0ff]"
                    variants={itemVariants}
                >
                    <span className="glitch__main">BRANDON MONTEALEGRE</span>
                    <span className="glitch__clone">BRANDON MONTEALEGRE</span>
                    <span className="glitch__clone">BRANDON MONTEALEGRE</span>
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
                    <button className="font-sans font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-md hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-300 shadow-[0_0_10px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_20px_var(--color-accent-jedi-blue)]">
                        Explorar Proyectos
                    </button>
                    <a
                        href="mailto:tu-email@example.com"
                        className="font-sans font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] rounded-md hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] transition-all duration-300 shadow-[0_0_10px_var(--color-accent-jedi-green)] hover:shadow-[0_0_20px_var(--color-accent-jedi-green)]"
                    >
                        Contactar
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
