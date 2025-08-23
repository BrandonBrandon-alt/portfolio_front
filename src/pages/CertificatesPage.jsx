import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilter,
  FaSearch,
  FaCertificate,
  FaTrophy,
  FaCode,
} from "react-icons/fa";
import CertificateCard from "../components/ui/CertificateCard";
import certificatesData from "../data/certificates.json";
import usePageMeta from "../hooks/usePageMeta";

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Configurar meta tags
  usePageMeta({
    title: "Certificados",
    description:
      "Certificaciones profesionales en desarrollo web, programación y tecnologías modernas. React, Node.js, Python, AWS y más.",
  });

  // Cargar certificados
  useEffect(() => {
    const timer = setTimeout(() => {
      setCertificates(certificatesData);
      setFilteredCertificates(certificatesData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filtrar certificados
  useEffect(() => {
    let filtered = certificates;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((cert) => cert.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCertificates(filtered);
  }, [certificates, selectedCategory, searchTerm]);

  // Obtener categorías únicas
  const categories = [
    "All",
    ...new Set(certificates.map((cert) => cert.category)),
  ];

  // Estadísticas
  const stats = {
    total: certificates.length,
    categories: new Set(certificates.map((cert) => cert.category)).size,
    totalHours: certificates.reduce((acc, cert) => {
      const hours = parseInt(cert.duration.match(/\d+/)?.[0] || 0);
      return acc + hours;
    }, 0),
    latestYear: Math.max(...certificates.map((cert) => parseInt(cert.date))),
  };

  return (
    <motion.div
      className="min-h-screen bg-[var(--color-background)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-accent-jedi-blue)] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Container principal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header con título holográfico */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge superior */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-4 py-2 rounded-full border border-[var(--color-accent-jedi-green)]/30 backdrop-blur-sm">
              <FaCertificate className="inline mr-2" />
              PORTFOLIO_CERTIFICATIONS / SISTEMA_VERIFICADO
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] via-[var(--color-text-primary)] to-[var(--color-accent-jedi-green)] relative mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <FaCode className="hidden sm:inline-block mr-4 text-[var(--color-accent-jedi-green)] text-3xl sm:text-5xl align-middle" />
            CERTIFICADOS
            {/* Underline holográfico */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: 1.2, duration: 1.5 }}
            />
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-lg sm:text-xl text-[var(--color-text-primary)]/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Certificaciones profesionales que validan mi experiencia en
            desarrollo web, programación y tecnologías modernas. Cada
            certificado representa horas de aprendizaje y práctica continua.
          </motion.p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            {
              label: "Certificados",
              value: stats.total,
              icon: FaCertificate,
              color: "jedi-blue",
            },
            {
              label: "Categorías",
              value: stats.categories,
              icon: FaFilter,
              color: "jedi-green",
            },
            {
              label: "Horas Totales",
              value: `${stats.totalHours}h`,
              icon: FaTrophy,
              color: "jedi-blue",
            },
            {
              label: "Último Año",
              value: stats.latestYear,
              icon: FaCode,
              color: "jedi-green",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`relative p-4 sm:p-6 rounded-xl border border-[var(--color-accent-${stat.color})]/30 bg-[var(--color-accent-${stat.color})]/5 backdrop-blur-sm group hover:border-[var(--color-accent-${stat.color})]/60 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-center">
                <stat.icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-accent-${stat.color})] mx-auto mb-2 sm:mb-3`}
                />
                <div
                  className={`text-2xl sm:text-3xl font-bold font-mono text-[var(--color-accent-${stat.color})] mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-mono text-[var(--color-text-primary)]/70">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div
          className="bg-[var(--color-background)]/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Búsqueda */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-primary)]/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar certificados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)]/60 border border-white/20 rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/50 focus:outline-none focus:border-[var(--color-accent-jedi-blue)]/60 focus:ring-2 focus:ring-[var(--color-accent-jedi-blue)]/20 transition-all duration-300"
              />
            </div>

            {/* Filtros de categoría */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                      : "bg-[var(--color-background)]/60 text-[var(--color-text-primary)]/70 border border-white/20 hover:border-[var(--color-accent-jedi-blue)]/60 hover:text-[var(--color-accent-jedi-blue)]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid de certificados */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Skeleton loading
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-background)]/50 rounded-xl border border-white/10 p-6 animate-pulse"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-xl" />
                    <div className="w-20 h-6 bg-white/10 rounded-full" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-16 bg-white/10 rounded" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-white/10 rounded w-16" />
                      <div className="h-6 bg-white/10 rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredCertificates.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            // Estado vacío
            <motion.div
              className="text-center py-16 sm:py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaSearch className="w-16 h-16 text-[var(--color-text-primary)]/30 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]/70 mb-2">
                No se encontraron certificados
              </h3>
              <p className="text-[var(--color-text-primary)]/50 mb-6">
                Intenta con otros términos de búsqueda o selecciona una
                categoría diferente
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] rounded-lg font-mono font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LIMPIAR FILTROS
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Información adicional */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="inline-flex items-center gap-4 font-mono text-sm text-[var(--color-text-primary)]/40">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-accent-jedi-green)] rounded-full animate-pulse" />
              CERTIFICADOS VERIFICADOS
            </span>
            <span className="text-[var(--color-accent-jedi-blue)]">|</span>
            <span>ACTUALIZADO {stats.latestYear}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CertificatesPage;
