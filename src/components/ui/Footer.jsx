import React from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
        </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
    ),
  },
  {
    href: "https://wa.me/573001234567",
    label: "WhatsApp",
    icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.4 0 4.68.84 6.48 2.36A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.62-.48-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.44 0 1.44 1.03 2.84 1.18 3.04.15.2 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
        </svg>
    ),
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
                      className="bg-[var(--color-accent-jedi-blue)]/10 hover:bg-[var(--color-accent-jedi-blue)] text-white rounded-full p-3 transition duration-300 shadow-[0_0_6px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_12px_var(--color-accent-jedi-blue)]"
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
