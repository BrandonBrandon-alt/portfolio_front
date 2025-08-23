import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AboutTeaser = () => {
  return (
    <motion.section
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
    >
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)]/95 to-[var(--color-background)]/90">
        {/* Partículas de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Grid holográfico - oculto en móviles */}
        <div className="absolute inset-0 opacity-5 hidden sm:block">
          <div className="grid grid-cols-8 h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="border-r border-[var(--color-accent-jedi-blue)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contenedor principal con bordes holográficos */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Marco holográfico */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-[var(--color-accent-jedi-blue)]/30 sm:border-2 bg-gradient-to-br from-[var(--color-accent-jedi-green)]/5 via-transparent to-[var(--color-accent-jedi-blue)]/5 backdrop-blur-sm">
          {/* Esquinas brillantes */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-l sm:border-t-2 sm:border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl sm:rounded-tl-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-r sm:border-t-2 sm:border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl sm:rounded-tr-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-l sm:border-b-2 sm:border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl sm:rounded-bl-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-r sm:border-b-2 sm:border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl sm:rounded-br-3xl animate-pulse" />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(0,255,159,0.1)] sm:shadow-[0_0_60px_rgba(0,255,159,0.15)] animate-pulse" />
        </div>

        {/* Header con identificador */}
        <motion.div
          className="relative z-10 mb-8 sm:mb-10 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 sm:mb-6 flex justify-center">
            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--color-accent-jedi-blue)]/30">
              REGISTRO DE DATOS / PERSONAL FILE
            </span>
          </div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-green)] via-[var(--color-text-primary)] to-[var(--color-accent-jedi-blue)] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            SOBRE MÍ
            {/* Underline holográfico */}
            <motion.div
              className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-green)] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 1, duration: 1.2 }}
            />
          </motion.h2>
        </motion.div>

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Foto profesional rediseñada */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Anillos holográficos animados */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-accent-jedi-blue)]/40 sm:border-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 sm:inset-4 rounded-full border border-[var(--color-accent-jedi-green)]/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Efecto de escaneo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--color-accent-jedi-blue)]/20 via-transparent to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Contenedor de la imagen */}
              <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/10 via-transparent to-[var(--color-accent-jedi-green)]/10 backdrop-blur-sm border border-[var(--color-accent-jedi-green)]/30">
                <img
                  src="brandon-profile.jpg"
                  alt="Brandon Montealegre - Full Stack Developer"
                  className="w-full h-full object-cover"
                  width="320" /* responsive: 48*4 to 80*4 (192-320px) */
                  height="320"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />

                {/* Placeholder holográfico */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/20 to-[var(--color-accent-jedi-green)]/20 backdrop-blur-sm hidden">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-4 rounded-full bg-[var(--color-accent-jedi-blue)]/30 flex items-center justify-center border border-[var(--color-accent-jedi-blue)]/50"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-lg sm:text-2xl md:text-3xl">
                        👨‍💻
                      </span>
                    </motion.div>
                    <p className="text-xs sm:text-sm font-mono text-[var(--color-accent-jedi-green)]">
                      FOTO PROFESIONAL
                    </p>
                    <p className="text-[10px] sm:text-xs font-mono text-[var(--color-text-muted)]">
                      [ CARGANDO... ]
                    </p>
                  </div>
                </div>
              </div>

              {/* Partículas orbitales */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-accent-jedi-green)] rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-3px",
                    marginLeft: "-3px",
                  }}
                  animate={{
                    x: [
                      0,
                      (60 + window.innerWidth * 0.08) *
                        Math.cos((i * Math.PI) / 2),
                    ],
                    y: [
                      0,
                      (60 + window.innerWidth * 0.08) *
                        Math.sin((i * Math.PI) / 2),
                    ],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Contenido de texto rediseñado */}
          <motion.div
            className="flex-1 text-center lg:text-left px-2 sm:px-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Badge de rol */}
            <motion.div
              className="mb-4 sm:mb-6 flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="text-xs sm:text-sm font-mono tracking-wider text-[var(--color-accent-jedi-blue)] bg-[var(--color-accent-jedi-blue)]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[var(--color-accent-jedi-blue)]/30">
                FULL STACK DEVELOPER
              </span>
            </motion.div>

            {/* Descripción con animación de escritura */}
            <motion.div
              className="mb-8 sm:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-base sm:text-lg md:text-xl font-sans text-[var(--color-text-primary)]/90 leading-relaxed mb-3 sm:mb-4">
                Soy{" "}
                <span className="text-[var(--color-accent-jedi-blue)] font-bold font-mono">
                  Brandon Montealegre
                </span>
                , un desarrollador con experiencia en tecnologías
              </p>
              <p className="text-base sm:text-lg md:text-xl font-sans text-[var(--color-text-primary)]/90 leading-relaxed">
                <span className="text-[var(--color-accent-jedi-green)] font-semibold">
                  Frontend y Backend
                </span>
                . Fusiono código y creatividad para construir experiencias
                digitales que parecen sacadas del futuro.
              </p>

              {/* Cursor parpadeante */}
              <motion.span
                className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[var(--color-accent-jedi-green)] ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.div>

            {/* Botón rediseñado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/about"
                className="group relative overflow-hidden inline-block font-mono font-bold py-3 sm:py-4 px-6 sm:px-8 border border-[var(--color-accent-jedi-green)] sm:border-2 text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_15px_rgba(0,255,159,0.25)] sm:shadow-[0_0_20px_rgba(0,255,159,0.3)] hover:shadow-[0_0_30px_rgba(0,255,159,0.5)] sm:hover:shadow-[0_0_40px_rgba(0,255,159,0.6)] text-sm sm:text-base"
              >
                <span className="relative z-10">ACCEDER ARCHIVO</span>
                {/* Efecto de barrido */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </NavLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Datos técnicos en la esquina */}
        <motion.div
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-[10px] sm:text-xs font-mono text-[var(--color-accent-jedi-green)]/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="text-right">
            <div>ID: DEV_001</div>
            <div>STATUS: ACTIVE</div>
            <div>LEVEL: STUDENT</div>
          </div>
        </motion.div>
      </div>

      {/* Efecto de escaneo holográfico */}
      {/* Overlay global ahora maneja el efecto holográfico; se elimina local */}
    </motion.section>
  );
};

export default AboutTeaser;
