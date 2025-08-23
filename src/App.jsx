import React, { lazy, Suspense } from "react";
import { websiteSchema, personSchema } from "./utils/structuredData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import useIdleRoutePrefetch from "./hooks/useIdleRoutePrefetch";

// Importa tus componentes de layout y UI
import MainLayout from "./components/layout/MainLayout";
import ErrorBoundary from "./components/utils/ErrorBoundary.jsx";

// --- LAZY LOADING PAGES ---
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const HomePageContent = lazy(() => import("./pages/HomePageContent"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));

// Componentes simples (dummies) para otras secciones si no existen

const Contact = lazy(() => import("./pages/ContactOptionsPage"));
const NotFound = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-[var(--color-accent-sith-red)]/90 text-[var(--color-text-primary)] text-4xl font-bold">
    404 - Página no encontrada
  </div>
);

function App() {
  useIdleRoutePrefetch();
  return (
    <BrowserRouter>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="skip-to-content focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-green)]"
      >
        Saltar al contenido principal
      </a>
      <ScrollToTop />
      {/* Global Structured Data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema(), personSchema()]),
        }}
      />
      <ErrorBoundary>
        <MainLayout>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen text-[var(--color-accent-jedi-blue)]">
                Cargando...
              </div>
            }
          >
            {" "}
            {/* Puedes usar un spinner aquí */}
            <div id="main-content" role="main" className="outline-none">
              <Routes>
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
  );
}

export default App;
