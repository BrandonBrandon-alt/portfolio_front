import React from 'react';
import { motion } from 'framer-motion';
import ContactFormSection from '../components/sections/ContactFormSection';
import Button from '../components/ui/Button';
import { FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Importar iconos
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline'; // Importar icono de flecha
import './ContactOptionsPage.css'; // Importar el nuevo CSS

const ContactOptionsPage = () => {
  return (
      <motion.div
          className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 lg:px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
            className="text-5xl md:text-6xl font-display text-[var(--color-text-primary)] text-center mb-8 lightsaber-underline"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Contáctame
        </motion.h1>

        <div className="contact-page-container w-full max-w-5xl p-8 md:p-12">
          <div className="contact-intro-box mb-10">
            <p className="text-lg md:text-xl font-sans text-[var(--color-text-primary)] text-center leading-relaxed">
              ¡Me encantaría saber de ti! Puedes contactarme a través del formulario o directamente por mis redes sociales y correo.
            </p>
          </div>

          {/* Formulario de Contacto */}
          <ContactFormSection />

          <div className="contact-divider"></div> {/* Separador visual */}

          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="my-4 text-[var(--color-accent-jedi-blue)]"
          >
            <ChevronDoubleDownIcon className="h-8 w-8 mx-auto" />
            <p className="text-sm font-sans text-center mt-1">O encuéntrame aquí</p>
          </motion.div>

          {/* Sección de Medios de Comunicación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-8">
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
          </div>
        </div> {/* <- cierre de contact-page-container */}
      </motion.div> // <- Cierre correcto de motion.div
  );
};

export default ContactOptionsPage;
