import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

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
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent-jedi-blue)]">Contáctanos</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Teléfono: <a href="tel:+573001234567" className="hover:text-[var(--color-accent-jedi-blue)] transition">+57 300 123 4567</a></p>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Email: <a href="mailto:info@odontologic.com" className="hover:text-[var(--color-accent-jedi-blue)] transition">info@odontologic.com</a></p>
            <p className="text-sm text-[var(--color-text-muted)]">Dirección: Calle 10 #15-20, Armenia, Quindío</p>
          </div>

          {/* Redes */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent-jedi-blue)]">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, label, icon }) => (
                  <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="bg-[var(--color-accent-jedi-blue)]/10 hover:bg-[var(--color-accent-jedi-green)] text-white rounded-full p-3 transition duration-300 shadow-[0_0_6px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_12px_var(--color-accent-jedi-green)]"
                  >
                    {icon}
                  </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex-1 flex flex-col items-center md:items-end">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent-jedi-blue)]">Legal</h3>
            <div className="flex flex-col space-y-1 text-sm text-[var(--color-text-muted)]">
              <Link to="/privacy" className="hover:text-[var(--color-accent-jedi-blue)] transition">Política de Privacidad</Link>
              <Link to="/terms" className="hover:text-[var(--color-accent-jedi-blue)] transition">Términos de Servicio</Link>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="container mx-auto px-4 mt-8 border-t border-white/10 pt-4 text-center text-xs text-[var(--color-text-muted)] tracking-wide">
          &copy; {new Date().getFullYear()} Odontologic — Todos los derechos reservados.
        </div>

        {children && <div className="mt-2 w-full">{children}</div>}
      </footer>
  );
};

export default Footer;