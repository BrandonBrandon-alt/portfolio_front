import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/brandon-montealegre-acevedo-68bab0254/",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    href: "https://wa.me/573153033412",
    label: "WhatsApp",
    icon: <FaWhatsapp className="w-5 h-5" />,
  },
  {
    href: "mailto:brandonmontealegre15@gmail.com",
    label: "Correo Electrónico",
    icon: <FaEnvelope className="w-5 h-5" />,
  },
];

const Footer = ({ children }) => {
  return (
      <footer className="bg-[var(--color-background)] text-[var(--color-text-primary)] border-t border-[var(--color-accent-jedi-blue)]/40 py-10 backdrop-blur-sm shadow-inner shadow-[var(--color-accent-jedi-blue)]/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-12 items-center md:items-start text-center md:text-left">
          {/* Contacto */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent-jedi-blue)]">Datos de contacto</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Teléfono: <a href="tel:+573153033412" className="hover:text-[var(--color-accent-jedi-blue)] transition">+57 315 303 3412</a></p>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Email: <a href="brandonmontealegre15@gmail.com" className="hover:text-[var(--color-accent-jedi-blue)] transition">brandonmontealegre15@gmail.com</a></p>
          </div>

          {/* Redes */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent-jedi-blue)]">Contactame</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, label, icon }) => (
                  <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="bg-[var(--color-accent-jedi-blue)]/10 hover:bg-[var(--color-accent-jedi-green)] text-white rounded-full p-3 transition duration-300 shadow-[0_0_6px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_12px_var(--color-accent-jedi-green)]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.a>
              ))}
            </div>
          </div>

          {/* Navegación Rápida */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Navegación Rápida</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-jedi-blue)] transition">Inicio</Link></li>
              <li><Link to="/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-jedi-blue)] transition">Proyectos</Link></li>
              <li><Link to="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-jedi-blue)] transition">Acerca de</Link></li>
              <li><Link to="/contact" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-jedi-blue)] transition">Contacto</Link></li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="container mx-auto px-4 mt-8 border-t border-white/10 pt-4 text-center text-xs text-[var(--color-text-muted)] tracking-wide">
          &copy; {new Date().getFullYear()} BRAN/DEV — Todos los derechos reservados.
        </div>

        {children && <div className="mt-2 w-full">{children}</div>}
      </footer>
  );
};

export default Footer;