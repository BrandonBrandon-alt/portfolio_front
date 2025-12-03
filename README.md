# Portfolio Web

A modern, interactive portfolio website built with React, Three.js, and Tailwind CSS. This project showcases a dynamic user interface with 3D elements, smooth animations, and a responsive design.

## Features

-   **3D Graphics**: Immersive 3D elements powered by [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber).
-   **Animations**: Smooth transitions and gesture-based interactions using [Framer Motion](https://www.framer.com/motion/).
-   **Responsive Design**: Fully responsive layout built with [Tailwind CSS](https://tailwindcss.com/).
-   **Interactive Backgrounds**: Particle effects using [tsparticles](https://particles.js.org/).
-   **Contact Form**: Integrated with [EmailJS](https://www.emailjs.com/) for direct messaging.
-   **Modern Tooling**: Fast development experience with [Vite](https://vitejs.dev/).

## Tech Stack

-   **Core**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
-   **3D & Graphics**: Three.js, React Three Fiber, React Three Drei
-   **Animations**: Framer Motion
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Utilities**: Axios, React Toastify

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/BrandonBrandon-alt/portfolio_front.git
    cd portfolio_front
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory and add your necessary environment variables (e.g., EmailJS keys).

    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run preview`: Locally preview the production build.

## Project Structure

```
src/
├── assets/         # Static assets (images, models)
├── components/     # Reusable UI components
├── pages/          # Application pages/routes
├── styles/         # Global styles and Tailwind config
├── utils/          # Helper functions and hooks
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).
