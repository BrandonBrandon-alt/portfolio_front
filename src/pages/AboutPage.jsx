import { Link } from 'react-router-dom';
import '../styles/HeroTextAnimation.css';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2, // Retraso inicial para la página
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
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

const AboutPage = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-display text-center mb-8 relative inline-block lightsaber-underline animated-text-ray"
        variants={itemVariants}
      >
        Acerca de Mí
      </motion.h1>

      <motion.section
        className="mb-10 text-center md:text-left"
        variants={itemVariants}
      >
        {/* Espacio para tu imagen */}
        {/* <img src="/path/to/your/image.jpg" alt="Tu Nombre" className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-[var(--color-accent-jedi-blue)]" /> */}
        
        <motion.p className="text-lg leading-relaxed text-[var(--color-text-primary)] mb-4" variants={itemVariants}>
          ¡Hola! Soy [Tu Nombre], un desarrollador [Front-end/Full-stack/etc.] apasionado por transformar ideas creativas en soluciones digitales funcionales y estéticamente atractivas. Mi objetivo es construir experiencias de usuario intuitivas y de alto rendimiento que dejen una impresión duradera.
        </motion.p>
        <motion.p className="text-lg leading-relaxed text-[var(--color-text-primary)]" variants={itemVariants}>
          Con una sólida base en [menciona 1-2 tecnologías clave, ej. React y Node.js], me dedico a la mejora continua y a la exploración de nuevas herramientas y metodologías para mantenerme a la vanguardia en el dinámico mundo del desarrollo web.
        </motion.p>
      </motion.section>

      <motion.section
        className="mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Mi Trayectoria</h2>
        <motion.p className="text-base leading-relaxed text-[var(--color-text-primary)] mb-4" variants={itemVariants}>
          Mi viaje en el desarrollo comenzó con [menciona cómo empezaste, ej. la curiosidad por cómo funcionaban las aplicaciones web, un curso, un proyecto personal]. Desde entonces, he cultivado una profunda pasión por el código y el diseño, siempre buscando la manera más eficiente y elegante de resolver problemas.
        </motion.p>
        <motion.p className="text-base leading-relaxed text-[var(--color-text-primary)]" variants={itemVariants}>
          A lo largo de mi carrera, he tenido la oportunidad de trabajar en [menciona tipos de proyectos o entornos, ej. proyectos desafiantes que me han permitido crecer en el desarrollo de interfaces de usuario complejas y la optimización de rendimiento]. Cada experiencia ha sido una valiosa lección que ha moldeado mi enfoque hacia la creación de software robusto y escalable.
        </motion.p>
      </motion.section>

      <motion.section
        className="mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Filosofía y Enfoque</h2>
        <motion.p className="text-base leading-relaxed text-[var(--color-text-primary)] mb-4" variants={itemVariants}>
          Mi filosofía de trabajo se centra en la **calidad, la colaboración y la innovación**. Creo firmemente en escribir código limpio, modular y bien documentado que sea fácil de mantener y escalar. La comunicación efectiva y el trabajo en equipo son pilares fundamentales en cada proyecto en el que me involucro, buscando siempre la mejor solución en conjunto.
        </motion.p>
        <motion.p className="text-base leading-relaxed text-[var(--color-text-primary)]" variants={itemVariants}>
          Me apasiona el diseño centrado en el usuario, asegurando que cada interacción sea intuitiva y agradable. Siempre estoy abierto a aprender nuevas tecnologías y a adaptarme a los requisitos cambiantes de los proyectos, manteniendo una mentalidad de crecimiento constante.
        </motion.p>
      </motion.section>

      <motion.section
        className="mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Habilidades Clave</h2>
        <motion.p className="text-base leading-relaxed text-[var(--color-text-primary)]" variants={itemVariants}>
          Mis principales habilidades incluyen:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <motion.li variants={itemVariants}>**Desarrollo Front-end:** [HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Tailwind CSS, Framer Motion]</motion.li>
            <motion.li variants={itemVariants}>**Desarrollo Back-end (si aplica):** [Node.js, Express.js, Python, FastAPI, Bases de Datos (MongoDB, PostgreSQL)]</motion.li>
            <motion.li variants={itemVariants}>**Herramientas y Metodologías:** [Git, GitHub, Metodologías Ágiles, Responsive Design, Optimización de Rendimiento]</motion.li>
            <motion.li variants={itemVariants}>**Habilidades Blandas:** [Resolución de Problemas, Aprendizaje Rápido, Trabajo en Equipo, Comunicación Efectiva, Adaptabilidad]</motion.li>
          </ul>
        </motion.p>
      </motion.section>

      <motion.section
        className="text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">¡Conectemos!</h2>
        <motion.p className="text-lg leading-relaxed text-[var(--color-text-primary)] mb-6" variants={itemVariants}>
          Si estás buscando un desarrollador dedicado y apasionado para tu próximo proyecto, o simplemente quieres charlar sobre tecnología, no dudes en contactarme. ¡Me encantaría saber de ti!
        </motion.p>
        <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
          <Link to="/projects" className="py-3 px-6 rounded-md font-bold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]/70 focus-visible:ring-offset-2 text-base border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_10px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_20px_var(--color-accent-jedi-blue)]">
            Ver Proyectos
          </Link>
          <Link to="/contact" className="py-3 px-6 rounded-md font-bold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]/70 focus-visible:ring-offset-2 text-base border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-green)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_10px_var(--color-accent-jedi-green)] hover:shadow-[0_0_20px_var(--color-accent-jedi-green)]">
            Contactar
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
