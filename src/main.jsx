/**
 * main.jsx - Punto de entrada principal de la aplicación React
 * 
 * Este archivo es el punto de entrada principal de la aplicación. Se encarga de:
 * 1. Inicializar el renderizado de la aplicación React
 * 2. Configurar Web Vitals para análisis de rendimiento
 * 3. Importar estilos globales
 * 4. Configurar notificaciones con Toastify
 */

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

// Importar estilos globales
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css"; // Estilos CSS para las notificaciones

// Componentes y utilidades
import { ToastContainer } from "react-toastify"; // Contenedor de notificaciones
import App from "./App.jsx"; // Componente principal de la aplicación
import { initWebVitals } from "./utils/webVitals"; // Utilidad para métricas de rendimiento

/**
 * Componente Boot
 * 
 * Componente de arranque que se encarga de inicializar métricas de rendimiento
 * y renderizar la aplicación principal.
 * 
 * @returns {JSX.Element} El componente de la aplicación envuelto en StrictMode
 */
function Boot() {
  // Inicializar métricas de rendimiento cuando el componente se monta
  useEffect(() => {
    initWebVitals();
  }, []);
  
  // Renderizar la aplicación principal
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Boot />
    <ToastContainer />
  </StrictMode>
);
