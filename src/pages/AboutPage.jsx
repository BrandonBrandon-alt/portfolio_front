import { Link } from "react-router-dom";
import "../styles/HeroTextAnimation.css";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../styles/animations";
import React from "react";
import usePageMeta from "../hooks/usePageMeta";
import PageTitleBlock from "../components/ui/PageTitleBlock";

const AboutPage = () => {
  usePageMeta({
    title: "Acerca de mí",
    description:
      "Conoce a Brandon Montealegre: experiencia, enfoque y habilidades como desarrollador Full Stack.",
  });

  // (Removed stray heading test element)

  return (
    <motion.div
      className="page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageTitleBlock
        title="ACERCA DE MI"
        badges={[
          { text: "[ PROFILE ]", variant: "blue" },
          { text: "LIVE", variant: "green" },
        ]}
        lead="Quién soy, mi enfoque profesional y cómo puedo aportar valor a tus proyectos a través de soluciones eficientes y escalables."
      />

      {/* Hero / Overview panel */}
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-12 mb-20 panel-holo p-8 rounded-2xl relative overflow-hidden group"
        data-variant="blue"
        variants={itemVariants}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-3 z-20">
          <span className="text-[10px] font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-2 py-1 rounded border border-[var(--color-accent-jedi-green)]/30">
            PROFILE OVERVIEW
          </span>
          <span className="text-[10px] font-mono tracking-wider text-[var(--color-accent-jedi-blue)]/70">
            LIVE
          </span>
        </div>
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.08),transparent_60%)]" />
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--color-accent-jedi-blue)]/20 via-transparent to-[var(--color-accent-jedi-green)]/20 mix-blend-screen" />
        {/* Foto profesional */}
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="relative w-48 h-48 md:w-64 md:h-64 holo-frame"
            data-corners="on"
          >
            {/* Efecto holográfico de fondo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-accent-jedi-blue)] via-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)] opacity-20 animate-pulse"></div>

            {/* Marco futurista */}
            <div className="absolute inset-2 rounded-full border-2 border-[var(--color-accent-jedi-blue)]/50 shadow-[0_0_30px_var(--color-accent-jedi-blue)] animate-pulse"></div>

            {/* Foto */}
            <img
              src="brandon-profile.jpg"
              alt="Brandon Montealegre - Full Stack Developer"
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-[var(--color-accent-jedi-green)]/30 shadow-2xl"
              width="256" /* md:w-64 = 16rem => pick largest for reserve space */
              height="256"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />

            {/* Placeholder */}
            <div className="relative z-10 w-full h-full rounded-full border-4 border-[var(--color-accent-jedi-green)]/30 shadow-2xl bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/20 to-[var(--color-accent-jedi-green)]/20 flex items-center justify-center backdrop-blur-sm hidden">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--color-accent-jedi-blue)]/30 flex items-center justify-center">
                  <span className="text-xl">👨‍💻</span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Foto Profesional
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Introducción personal */}
        <motion.div
          className="flex-1 text-center lg:text-left space-y-4"
          variants={itemVariants}
        >
          <motion.p
            className="holo-lead text-base md:text-lg mb-2"
            variants={itemVariants}
          >
            ¡Hola! Soy <strong>Brandon Montealegre</strong>, un desarrollador{" "}
            <strong>Full Stack</strong> apasionado por transformar ideas
            creativas en soluciones digitales funcionales y estéticamente
            atractivas. Mi objetivo es construir experiencias de usuario
            intuitivas y de alto rendimiento que dejen una impresión duradera.
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-[var(--color-text-primary)]/90"
            variants={itemVariants}
          >
            Con una sólida base en{" "}
            <strong>React, Node.js, Java y Spring Boot</strong>, me dedico a la
            mejora continua y a la exploración de nuevas herramientas y
            metodologías para mantenerme a la vanguardia en el dinámico mundo
            del desarrollo web.
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.section
        className="mb-16 relative panel-holo p-8 rounded-2xl overflow-hidden"
        data-variant="green"
        variants={itemVariants}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_70%_40%,rgba(0,255,159,0.15),transparent_65%)]" />
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)] tracking-wide relative inline-block">
          <span className="font-mono">MI TRAYECTORIA</span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-transparent animate-[holoUnderlineGrow_1.2s_0.3s_ease_forwards]"></span>
        </h2>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-[var(--color-text-primary)]/85 mb-4"
          variants={itemVariants}
        >
          Mi viaje en el desarrollo comenzó con la curiosidad por cómo
          funcionaban las aplicaciones web. Desde entonces, he cultivado una
          profunda pasión por el código y el diseño, siempre buscando la manera
          más eficiente y elegante de resolver problemas.
        </motion.p>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-[var(--color-text-primary)]/85"
          variants={itemVariants}
        >
          A lo largo de mi carrera, he tenido la oportunidad de trabajar en
          proyectos desafiantes que me han permitido crecer en el desarrollo de
          interfaces de usuario complejas y la optimización de rendimiento. Cada
          experiencia ha sido una valiosa lección que ha moldeado mi enfoque
          hacia la creación de software robusto y escalable.
        </motion.p>
      </motion.section>

      <motion.section
        className="mb-16 relative panel-holo p-8 rounded-2xl overflow-hidden"
        data-variant="blue"
        variants={itemVariants}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_60%,rgba(0,240,255,0.15),transparent_65%)]" />
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] tracking-wide relative inline-block">
          <span className="font-mono">FILOSOFIA & ENFOQUE</span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-transparent animate-[holoUnderlineGrow_1.2s_0.3s_ease_forwards]"></span>
        </h2>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-[var(--color-text-primary)]/85 mb-4"
          variants={itemVariants}
        >
          Mi filosofía de trabajo se centra en la{" "}
          <strong>calidad, la colaboración y la innovación</strong>. Creo
          firmemente en escribir código limpio, modular y bien documentado que
          sea fácil de mantener y escalar. La comunicación efectiva y el trabajo
          en equipo son pilares fundamentales en cada proyecto en el que me
          involucro, buscando siempre la mejor solución en conjunto.
        </motion.p>
        <motion.p
          className="text-sm md:text-base leading-relaxed text-[var(--color-text-primary)]/85"
          variants={itemVariants}
        >
          Me apasiona el diseño centrado en el usuario, asegurando que cada
          interacción sea intuitiva y agradable. Siempre estoy abierto a
          aprender nuevas tecnologías y a adaptarme a los requisitos cambiantes
          de los proyectos, manteniendo una mentalidad de crecimiento constante.
        </motion.p>
      </motion.section>

      <motion.section
        className="mb-16 relative panel-holo p-8 rounded-2xl overflow-hidden"
        data-variant="green"
        variants={itemVariants}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_80%_50%,rgba(0,255,159,0.15),transparent_65%)]" />
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-[var(--color-accent-jedi-blue)] tracking-wide relative inline-block">
          <span className="font-mono">HABILIDADES CLAVE</span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-accent-jedi-green)] to-transparent animate-[holoUnderlineGrow_1.2s_0.3s_ease_forwards]"></span>
        </h2>
        <motion.div
          className="text-sm md:text-base leading-relaxed text-[var(--color-text-primary)]/85"
          variants={itemVariants}
        >
          <div className="font-mono text-[var(--color-text-primary)]/60 mb-4 tracking-wider">
            [ STACK_RESUMEN ]
          </div>
          <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[var(--color-text-primary)]/90">
            <motion.li
              variants={itemVariants}
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--color-accent-jedi-blue)]/70"
            >
              <strong className="text-[var(--color-accent-jedi-blue)]">
                Frontend:
              </strong>{" "}
              HTML5, CSS3, JavaScript (ES6+), React.js, Angular, Tailwind CSS,
              Vite
            </motion.li>
            <motion.li
              variants={itemVariants}
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--color-accent-jedi-green)]/70"
            >
              <strong className="text-[var(--color-accent-jedi-green)]">
                Backend:
              </strong>{" "}
              Node.js, Python, Django, Java, Spring Boot, JWT
            </motion.li>
            <motion.li
              variants={itemVariants}
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--color-accent-jedi-blue)]/70"
            >
              <strong className="text-[var(--color-accent-jedi-blue)]">
                Bases de Datos:
              </strong>{" "}
              MongoDB, PostgreSQL, Oracle, SQL
            </motion.li>
            <motion.li
              variants={itemVariants}
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--color-accent-jedi-green)]/70"
            >
              <strong className="text-[var(--color-accent-jedi-green)]">
                Herramientas:
              </strong>{" "}
              Git, Docker, Podman, Postman, Metodologías Ágiles, Responsive
              Design, Optimización
            </motion.li>
            <motion.li
              variants={itemVariants}
              className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--color-accent-jedi-blue)]/70 md:col-span-2"
            >
              <strong className="text-[var(--color-accent-jedi-blue)]">
                Soft Skills:
              </strong>{" "}
              Resolución de Problemas, Aprendizaje Rápido, Trabajo en Equipo,
              Comunicación, Adaptabilidad
            </motion.li>
          </ul>
        </motion.div>
      </motion.section>

      <motion.section
        className="text-center relative panel-holo p-10 rounded-2xl overflow-hidden"
        data-variant="blue"
        variants={itemVariants}
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.12),transparent_70%)]" />
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-[var(--color-accent-jedi-green)] relative inline-block">
          <span className="font-mono">CONECTEMOS</span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[var(--color-accent-jedi-blue)] to-transparent animate-[holoUnderlineGrow_1.2s_0.3s_ease_forwards]"></span>
        </h2>
        <motion.p className="holo-lead mb-8" variants={itemVariants}>
          Si estás buscando un desarrollador dedicado y apasionado para tu
          próximo proyecto, o simplemente quieres charlar sobre tecnología, no
          dudes en contactarme. ¡Me encantaría saber de ti!
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={itemVariants}
        >
          <Link
            to="/projects"
            className="group relative overflow-hidden inline-block font-mono font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span className="relative z-10 tracking-wider">VER_PROYECTOS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
          <Link
            to="/contact"
            className="group relative overflow-hidden inline-block font-mono font-bold py-3 px-6 border-2 border-[var(--color-accent-jedi-green)] text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_15px_rgba(0,255,159,0.25)] hover:shadow-[0_0_30px_rgba(0,255,159,0.5)]"
          >
            <span className="relative z-10 tracking-wider">CONTACTAR</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
