import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
// Particles heavy libs will be dynamically imported only when hero visible & no reduce motion
// import Particles from "@tsparticles/react"; (removed for lazy load)
// import { loadSlim } from "tsparticles-slim"; (removed for lazy load)
// import particlesOptions from "./particles-config"; (lazy)
import Button from "../ui/Button";
import "../../styles/HeroTextAnimation.css";
import { FaCode, FaRocket } from "react-icons/fa";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [particlesContainer, setParticlesContainer] = useState(null);
  const [ParticlesCmp, setParticlesCmp] = useState(null);
  const [particlesOptions, setParticlesOptions] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const [isHyperspace, setIsHyperspace] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "BRANDON MONTEALEGRE";

  const particlesInit = useCallback(
    async (engine) => {
      if (!ParticlesCmp) return; // guard
      // loadSlim dynamically already done in visibility effect
    },
    [ParticlesCmp]
  );

  const particlesLoaded = useCallback(async (container) => {
    setParticlesContainer(container);
  }, []);

  const toggleHyperspace = useCallback(
    (enable) => {
      if (!particlesContainer) return;

      particlesContainer.loadOptions({
        particles: {
          move: {
            speed: enable ? 200 : 3,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
          shape: {
            type: enable ? "line" : "circle",
          },
          size: {
            value: enable ? { min: 1, max: 5 } : { min: 1, max: 3 },
          },
          links: {
            enable: !enable,
          },
          opacity: {
            value: enable ? 0.5 : 0.7,
          },
        },
      });
      setIsHyperspace(enable);
    },
    [particlesContainer]
  );

  // Efecto de escritura para el nombre
  // Efecto de escritura (omitido si reduce motion)
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(fullText);
      setIsTyping(false);
      return;
    }
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return; // No hiperspace en reduce motion
    const timeout = setTimeout(() => {
      toggleHyperspace(true);
      setTimeout(() => toggleHyperspace(false), 1000);
    }, 500);
    return () => clearTimeout(timeout);
  }, [toggleHyperspace, shouldReduceMotion]);

  // Detect mobile viewport (once) for responsive + perf decisions
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Lazy import particles when hero visible & user not motion-reduced & not small mobile (perf)
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;
    if (!heroRef.current) return;
    let observer;
    let cancelled = false;
    function loadParticles() {
      Promise.all([
        import("@tsparticles/react"),
        import("tsparticles-slim").then((m) => m.loadSlim),
        import("./particles-config"),
      ])
        .then(([reactMod, loadSlimFn, configMod]) => {
          if (cancelled) return;
          setParticlesCmp(() => reactMod.default);
          setParticlesOptions(configMod.default);
          // loadSlim on first engine init will run via callback
        })
        .catch(() => {});
    }
    // Use IntersectionObserver to delay cost until actually in viewport (should be on load, but safe)
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            loadParticles();
            observer.disconnect();
          }
        });
      });
      observer.observe(heroRef.current);
    } else {
      // fallback: idle
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadParticles, { timeout: 3000 });
      } else {
        setTimeout(loadParticles, 1500);
      }
    }
    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
  }, [shouldReduceMotion, isMobile]);

  useEffect(() => {
    if (shouldReduceMotion) return; // Desactiva animación reactiva al scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (
        currentScrollY < lastScrollY &&
        currentScrollY < 50 &&
        !isHyperspace
      ) {
        toggleHyperspace(true);
        setTimeout(() => toggleHyperspace(false), 1000);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHyperspace, toggleHyperspace, shouldReduceMotion]);

  return (
    <section
      ref={heroRef}
      className="min-h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden px-4 sm:px-6"
    >
      {/* Fondo con gradiente holográfico */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)]/95 to-[var(--color-background)]/90">
        {/* Grid holográfico (simplificado en móviles & reduce motion) */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 opacity-10 hidden sm:block">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border-r border-b border-[var(--color-accent-jedi-blue)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: Math.random() > 0.85 ? 0.25 : 0 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: Math.random() * 2.5,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {!shouldReduceMotion && !isMobile && ParticlesCmp && particlesOptions && (
        <ParticlesCmp
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
          className="absolute inset-0 z-0 will-change-transform"
        />
      )}
      {/* lightweight placeholder gradient while particles bundle loads */}
      {!shouldReduceMotion && !isMobile && !ParticlesCmp && (
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.08),transparent_70%)] animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Marco holográfico principal */}
      <motion.div
        className="absolute inset-4 sm:inset-10 lg:inset-20 border border-[var(--color-accent-jedi-blue)]/25 sm:border-2 rounded-2xl sm:rounded-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, type: "spring" }}
      >
        {/* Esquinas brillantes */}
        <div className="absolute top-0 left-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-t border-l sm:border-t-2 sm:border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl sm:rounded-tl-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-t border-r sm:border-t-2 sm:border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl sm:rounded-tr-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-b border-l sm:border-b-2 sm:border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl sm:rounded-bl-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-b border-r sm:border-b-2 sm:border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl sm:rounded-br-3xl animate-pulse" />
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        className="text-center p-4 relative z-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 60 }}
      >
        {/* Badge superior */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-6 py-3 rounded-full border border-[var(--color-accent-jedi-green)]/30 backdrop-blur-sm">
            <FaRocket className="inline mr-2" />
            SISTEMA INICIADO / SYSTEM ONLINE
          </span>
        </motion.div>

        {/* Título principal con efecto de escritura */}
        <motion.div className="mb-8">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-tight font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-jedi-blue)] via-[var(--color-text-primary)] to-[var(--color-accent-jedi-green)] relative break-words"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <FaCode className="hidden sm:inline-block mr-4 text-[var(--color-accent-jedi-green)] text-3xl sm:text-5xl align-middle" />
            {displayText}
            {isTyping && !shouldReduceMotion && (
              <motion.span
                className="inline-block w-1 h-10 sm:h-14 lg:h-16 bg-[var(--color-accent-jedi-blue)] ml-2 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.h1>

          {/* Underline holográfico */}
          <motion.div
            className="mx-auto mt-4 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent-jedi-blue)] to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 2, duration: 1.5 }}
          />
        </motion.div>

        {/* Subtítulo */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-xl sm:text-2xl md:text-4xl font-sans font-bold text-[var(--color-text-primary)] mb-2">
            DESARROLLADOR FULL STACK
          </p>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px bg-[var(--color-accent-jedi-green)] flex-1 max-w-16 sm:max-w-24 md:max-w-32" />
            <span className="text-sm sm:text-base md:text-xl font-mono text-[var(--color-accent-jedi-green)] text-center">
              CREANDO EXPERIENCIAS DEL FUTURO
            </span>
            <div className="h-px bg-[var(--color-accent-jedi-green)] flex-1 max-w-16 sm:max-w-24 md:max-w-32" />
          </div>
        </motion.div>


        {/* Descripción */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-sans text-[var(--color-text-primary)]/80 mb-10 md:mb-12 max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          Transformando ideas en soluciones digitales innovadoras. Especializado
          en desarrollo frontend y backend, con enfoque en la eficiencia,
          escalabilidad y experiencia de usuario excepcional.
          <motion.span
            className="inline-block w-0.5 h-5 bg-[var(--color-accent-jedi-green)] ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 3.5 }}
          />
        </motion.p>

        {/* Botones rediseñados */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as="a"
              href="/projects"
              className="group relative overflow-hidden font-mono font-bold py-3 sm:py-4 px-6 sm:px-8 border border-[var(--color-accent-jedi-blue)] sm:border-2 text-[var(--color-accent-jedi-blue)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] text-sm sm:text-base"
            >
              <span className="relative z-10">EXPLORAR PROYECTOS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as="a"
              href="/contact"
              className="group relative overflow-hidden font-mono font-bold py-3 sm:py-4 px-6 sm:px-8 border border-[var(--color-accent-jedi-green)] sm:border-2 text-[var(--color-accent-jedi-green)] rounded-lg hover:text-[var(--color-background)] transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-green)] shadow-[0_0_20px_rgba(0,255,159,0.35)] hover:shadow-[0_0_40px_rgba(0,255,159,0.7)] text-sm sm:text-base"
            >
              <span className="relative z-10">INICIAR CONTACTO</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Indicadores de estado */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
        >
          {[].map((stat, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`border border-[var(--color-accent-${stat.color})]/30 rounded-lg p-4 bg-[var(--color-accent-${stat.color})]/5 backdrop-blur-sm`}
              >
                <div
                  className={`text-2xl font-mono font-bold text-[var(--color-accent-${stat.color})]`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-mono text-[var(--color-text-primary)]/70">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Efecto de escaneo holográfico */}
      {/* Overlay local retirado (efecto ahora global) */}
    </section>
  );
};

export default Hero;
