# Portafolio Web

Un sitio web de portafolio moderno e interactivo construido con React, Three.js y Tailwind CSS. Este proyecto muestra una interfaz de usuario dinámica con elementos 3D, animaciones fluidas y un diseño totalmente responsivo.

## Características

-   **Gráficos 3D**: Elementos 3D inmersivos impulsados por [Three.js](https://threejs.org/) y [React Three Fiber](https://docs.pmnd.rs/react-three-fiber).
-   **Animaciones**: Transiciones suaves e interacciones basadas en gestos usando [Framer Motion](https://www.framer.com/motion/).
-   **Diseño Responsivo**: Diseño totalmente adaptable construido con [Tailwind CSS](https://tailwindcss.com/).
-   **Fondos Interactivos**: Efectos de partículas usando [tsparticles](https://particles.js.org/).
-   **Formulario de Contacto**: Integrado con [EmailJS](https://www.emailjs.com/) para mensajería directa.
-   **Herramientas Modernas**: Experiencia de desarrollo rápida con [Vite](https://vitejs.dev/).

## Tecnologías

-   **Núcleo**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
-   **3D y Gráficos**: Three.js, React Three Fiber, React Three Drei
-   **Animaciones**: Framer Motion
-   **Enrutamiento**: [React Router](https://reactrouter.com/)
-   **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Utilidades**: Axios, React Toastify

## Comenzando

Sigue estos pasos para configurar el proyecto localmente.

### Requisitos Previos

-   Node.js (v18 o superior recomendado)
-   npm o yarn

### Instalación

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/BrandonBrandon-alt/portfolio_front.git
    cd portfolio_front
    ```

2.  **Instalar dependencias**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**

    Crea un archivo `.env` en el directorio raíz y agrega tus variables de entorno necesarias (por ejemplo, claves de EmailJS).

    ```env
    VITE_EMAILJS_SERVICE_ID=tu_service_id
    VITE_EMAILJS_TEMPLATE_ID=tu_template_id
    VITE_EMAILJS_PUBLIC_KEY=tu_public_key
    ```

4.  **Iniciar el servidor de desarrollo**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173`.

## Scripts

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Construye la aplicación para producción.
-   `npm run lint`: Ejecuta ESLint para verificar la calidad del código.
-   `npm run preview`: Previsualiza localmente la compilación de producción.

## Estructura del Proyecto

```
src/
├── assets/         # Activos estáticos (imágenes, modelos)
├── components/     # Componentes de UI reutilizables
├── pages/          # Páginas/rutas de la aplicación
├── styles/         # Estilos globales y configuración de Tailwind
├── utils/          # Funciones auxiliares y hooks
├── App.jsx         # Componente principal de la aplicación
└── main.jsx        # Punto de entrada
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
