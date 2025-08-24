// src/components/certificates/CertificateModal.jsx
import React from "react";
import {
  FaDownload,
  FaExternalLinkAlt,
  FaCertificate,
  FaCalendar,
  FaUser,
} from "react-icons/fa";
import { usePDF } from "../../hooks/usePDF";
import Modal from "../ui/Modal";

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const { processPDF, loading } = usePDF();
  if (!certificate) return null;

  const filename = `${certificate.title.replace(/\s+/g, "_")}_certificate.pdf`;

  const handleViewFull = () =>
    processPDF(certificate.pdfUrl, { filename, strategy: "newTab" });
  const handleDownload = () =>
    processPDF(certificate.pdfUrl, { filename, strategy: "download" });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={certificate.title}
      size="large"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        <div className="space-y-4 lg:space-y-5 order-2 lg:order-1">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-accent-jedi-blue)]/30 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/10 via-transparent to-[var(--color-accent-jedi-green)]/10 backdrop-blur-sm group">
            <img
              src={certificate.image}
              alt={`${certificate.title} certificate`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Enhanced holographic corners */}
            <span className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-t border-l border-[var(--color-accent-jedi-green)] rounded-tl-xl animate-pulse" />
            <span className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-t border-r border-[var(--color-accent-jedi-green)] rounded-tr-xl animate-pulse" />
            <span className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-b border-l border-[var(--color-accent-jedi-green)]/60 rounded-bl-xl animate-pulse" />
            <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-b border-r border-[var(--color-accent-jedi-green)]/60 rounded-br-xl animate-pulse" />

            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -inset-x-8 top-0 h-1/4 bg-gradient-to-b from-[var(--color-accent-jedi-blue)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 translate-y-[-50%] group-hover:translate-y-[400%] transition-all duration-[2000ms] ease-out" />
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 lg:gap-4">
            <button
              onClick={handleViewFull}
              disabled={loading}
              className="group relative overflow-hidden flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base py-3 sm:py-3.5 px-4 bg-transparent border border-[var(--color-accent-jedi-green)] sm:border-2 text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_15px_rgba(0,255,159,0.25)] hover:shadow-[0_0_25px_rgba(0,255,159,0.5)] font-mono tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaExternalLinkAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10" />
              <span className="hidden xs:inline relative z-10">
                VER COMPLETO
              </span>
              <span className="xs:hidden relative z-10">VER</span>
              {/* Efecto de barrido holográfico */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="group relative overflow-hidden flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base py-3 sm:py-3.5 px-4 bg-transparent border border-[var(--color-accent-jedi-blue)] sm:border-2 text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] font-mono tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10" />
              <span className="hidden xs:inline relative z-10">DESCARGAR</span>
              <span className="xs:hidden relative z-10">DOWNLOAD</span>
              {/* Efecto de barrido holográfico */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-1 lg:order-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <FaCertificate className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent-jedi-green)]" />
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-[var(--color-text-primary)] font-mono tracking-wide">
              DETALLES DEL CERTIFICADO
            </h4>
          </div>

          {/* Holographic details panel */}
          <div className="relative rounded-xl border border-[var(--color-accent-jedi-blue)]/20 bg-gradient-to-br from-[var(--color-background)]/60 via-[var(--color-background)]/80 to-[var(--color-background)]/60 backdrop-blur-sm overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/5 via-transparent to-[var(--color-accent-jedi-green)]/5" />

            <div className="relative p-3 sm:p-4 lg:p-5 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                  <FaUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[var(--color-text-primary)]/60 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-blue)]/80 block mb-1">
                      EMISOR
                    </span>
                    <p className="font-medium text-xs sm:text-sm text-[var(--color-text-primary)] break-words leading-relaxed">
                      {certificate.provider}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                  <FaCalendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[var(--color-text-primary)]/60 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-green)]/80 block mb-1">
                      FECHA DE EMISIÓN
                    </span>
                    <p className="font-medium text-xs sm:text-sm text-[var(--color-text-primary)]">
                      {certificate.date}
                    </p>
                  </div>
                </div>

                {certificate.duration && (
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 rounded-full bg-[var(--color-accent-jedi-blue)]/60 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-blue)]/80 block mb-1">
                        DURACIÓN
                      </span>
                      <p className="font-medium text-xs sm:text-sm text-[var(--color-text-primary)]">
                        {certificate.duration}
                      </p>
                    </div>
                  </div>
                )}

                {certificate.instructor && (
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                    <FaUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[var(--color-text-primary)]/60 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-green)]/80 block mb-1">
                        INSTRUCTOR
                      </span>
                      <p className="font-medium text-xs sm:text-sm text-[var(--color-text-primary)] break-words leading-relaxed">
                        {certificate.instructor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {certificate.description && (
            <div className="pt-3 sm:pt-4 border-t border-[var(--color-accent-jedi-blue)]/20">
              <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-[var(--color-accent-jedi-green)]/5 via-transparent to-[var(--color-accent-jedi-blue)]/5 border border-white/10">
                <h5 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-green)]/80 mb-2">
                  DESCRIPCIÓN
                </h5>
                <p className="text-xs sm:text-sm text-[var(--color-text-primary)]/80 leading-relaxed">
                  {certificate.description}
                </p>
              </div>
            </div>
          )}

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="pt-1 sm:pt-2">
              <h5 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono text-[var(--color-accent-jedi-blue)]/80 mb-3">
                HABILIDADES CERTIFICADAS
              </h5>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {certificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] sm:text-[10px] lg:text-[11px] px-2 py-1 rounded-md bg-gradient-to-r from-[var(--color-accent-jedi-green)]/15 to-[var(--color-accent-jedi-green)]/5 text-[var(--color-accent-jedi-green)] border border-[var(--color-accent-jedi-green)]/25 backdrop-blur-sm tracking-wide font-mono hover:from-[var(--color-accent-jedi-green)]/25 hover:to-[var(--color-accent-jedi-green)]/10 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CertificateModal;
