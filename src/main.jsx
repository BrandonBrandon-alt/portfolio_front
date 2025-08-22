import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import App from "./App.jsx";
import { initWebVitals } from "./utils/webVitals";

// Kick off web vitals after mount
function Boot() {
  useEffect(() => {
    initWebVitals();
  }, []);
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Boot />
    <ToastContainer />
  </StrictMode>
);
