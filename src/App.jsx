import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de layout y UI
import MainLayout from './components/layout/MainLayout';

// --- LAZY LOADING PAGES ---
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const HomePageContent = lazy(() => import('./pages/HomePageContent'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));

// Componentes simples (dummies) para otras secciones si no existen
const About = () => <div className="flex items-center justify-center min-h-[calc(100vh-128px)] text-[var(--color-text-primary)]">Página de Acerca de</div>;
const Contact = lazy(() => import('./pages/ContactOptionsPage'));
const NotFound = () => <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-[var(--color-accent-sith-red)]/90 text-[var(--color-text-primary)] text-4xl font-bold">404 - Página no encontrada</div>;

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div className="flex items-center justify-center h-screen text-[var(--color-accent-jedi-blue)]">Cargando...</div>}> {/* Puedes usar un spinner aquí */}
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;