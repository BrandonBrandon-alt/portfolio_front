import React from 'react';
import { motion } from 'framer-motion';
import ContactFormSection from '../components/sections/ContactFormSection';
import Button from '../components/ui/Button';
import { FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../styles/HeroTextAnimation.css';
import { containerVariants, itemVariants } from '../styles/animations';

const ContactOptionsPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 lg:px-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl md:text-5xl text-center mb-8 lightsaber-underline drop-shadow-[0_0_15px_#0ff] animated-text-ray"
        variants={itemVariants}
      >
        CANAL DE COMUNICACIÓN
      </motion.h1>

      <motion.div
        className="w-full max-w-5xl p-8 md:p-12"
        variants={itemVariants}
      >
        <motion.div className="mb-10" variants={itemVariants}>
          <p className="text-lg md:text-xl font-sans text-[var(--color-text-primary)] text-center leading-relaxed">
            ¡Me encantaría saber de ti! Puedes contactarme a través del formulario o directamente por mis redes sociales y correo.
          </p>
        </motion.div>

        {/* Formulario de Contacto */}
        <ContactFormSection />

        {/* Separador visual */}
        <motion.div
          className="w-full max-w-2xl mx-auto my-12"
          variants={itemVariants}
        >
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent"></div>
        </motion.div>


        <motion.div
            className="text-center mb-8"
            variants={itemVariants}
        >
            <p className="text-lg font-sans text-[var(--color-text-primary)]">O encuéntrame aquí</p>
        </motion.div>


        {/* Sección de Medios de Comunicación */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-8"
          variants={itemVariants}
        >
          <Button
            as="a"
            href="https://www.linkedin.com/in/brandon-montealegre-acevedo-68bab0254/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A66C2] hover:bg-[#004182] text-white shadow-[0_0_15px_#0A66C2] hover:shadow-[0_0_30px_#0A66C2]"
            icon={<FaLinkedin />}
          >
            LinkedIn
          </Button>
          <Button
            as="a"
            href="https://wa.me/573153033412"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1DA851] text-white shadow-[0_0_15px_#25D366] hover:shadow-[0_0_30px_#25D366]"
            icon={<FaWhatsapp />}
          >
            WhatsApp
          </Button>
          <Button
            as="a"
            href="mailto:brandonmontealegre15@gmail.com"
            className="bg-[#EA4335] hover:bg-[#C5221F] text-white shadow-[0_0_15px_#EA4335] hover:shadow-[0_0_30px_#EA4335]"
            icon={<FaEnvelope />}
          >
            Correo Electrónico
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactOptionsPage;
