/**
 * App.jsx - Componente Principal de la Aplicación
 * 
 * Este es el componente raíz de la aplicación de portafolio. Configura el enrutamiento,
 * provee contextos globales y maneja la estructura general de la aplicación.
 * 
 * Características principales:
 * - Implementa code splitting con React.lazy para mejor rendimiento
 * - Configura enrutamiento del lado del cliente con React Router
 * - Provee contexto global (NotificationContext)
 * - Implementa límites de error para mejor manejo de errores
 * - Incluye características de accesibilidad (enlace de salto, manejo de foco)
 * - Maneja cambios de visibilidad de página
 */

import React, { lazy, Suspense } from "react";
import { websiteSchema, personSchema } from "./utils/structuredData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import useIdleRoutePrefetch from "./hooks/useIdleRoutePrefetch";
import usePageVisibility from "./hooks/usePageVisibility";
import { NotificationProvider } from "./contexts/NotificationContext";

// Componentes de Diseño y UI
import MainLayout from "./components/layout/MainLayout";
import ErrorBoundary from "./components/utils/ErrorBoundary.jsx";

// --- PÁGINAS CON CARGA DIFERIDA ---
// Las páginas se cargan de forma asíncrona para mejorar el rendimiento de carga inicial
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const HomePageContent = lazy(() => import("./pages/HomePageContent"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const Contact = lazy(() => import("./pages/ContactOptionsPage"));
/**
 * Componente 404 No Encontrado
 * Se muestra cuando se accede a una ruta que no existe
 */
const NotFound = () => (
  <div 
    className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-[var(--color-accent-sith-red)]/90 text-[var(--color-text-primary)] text-4xl font-bold"
    role="alert"
    aria-live="assertive"
  >
    404 - Página no encontrada
  </div>
);

/**
 * Componente Principal de la Aplicación
 * 
 * Este es el componente raíz que envuelve toda la aplicación con los proveedores necesarios
 * y configura el enrutamiento.
 * 
 * @returns {JSX.Element} El componente raíz de la aplicación
 */
function App() {
  // Precarga rutas cuando el navegador está inactivo para mejorar el rendimiento de navegación
  useIdleRoutePrefetch();

  /**
   * Maneja los cambios de visibilidad de página para recuperarse de errores
   * al regresar de aplicaciones externas (como visores de PDF)
   * @param {boolean} isVisible - Indica si la página está actualmente visible
   */
  usePageVisibility((isVisible) => {
    if (isVisible) {
      console.info("[App] Page became visible, checking for errors...");

      // Verificar si hay errores de JavaScript pendientes
      const hasJSErrors = window.performance
        ?.getEntriesByType?.("navigation")
        ?.some((entry) => entry.type === "reload");

      if (hasJSErrors) {
        console.warn("[App] Detected potential JS errors, but continuing...");
      }
    }
  });

  return (
    // Envuelve la aplicación con NotificationProvider para habilitar notificaciones globales
    <NotificationProvider>
      {/* Configura el enrutamiento del lado del cliente */}
      <BrowserRouter>
        {/* Enlace de salto para usuarios de teclado - mejora la accesibilidad */}
        <a
          href="#main-content"
          className="skip-to-content focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-green)]"
          aria-label="Saltar al contenido principal"
        >
          Saltar al contenido principal
        </a>
        
        {/* Desplazamiento automático al inicio en cambio de ruta */}
        <ScrollToTop />
        
        {/* Añade datos estructurados para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema(), personSchema()]),
          }}
        />
        
        {/* Límite de error global para capturar y manejar errores */}
        <ErrorBoundary>
          {/* Diseño principal de la aplicación */}
          <MainLayout>
            {/* Límite de Suspense para componentes de carga diferida */}
            <Suspense
              fallback={
                <div 
                  className="flex items-center justify-center h-screen text-[var(--color-accent-jedi-blue)]"
                  aria-live="polite"
                  aria-busy="true"
                >
                  Cargando...
                </div>
              }
            >
              {/* Área de contenido principal con rol ARIA apropiado para accesibilidad */}
              <div id="main-content" role="main" className="outline-none" tabIndex="-1">
                <Routes>
                  {/* Define todas las rutas de la aplicación */}
                  <Route path="/" element={<HomePageContent />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Suspense>
          </MainLayout>
        </ErrorBoundary>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
