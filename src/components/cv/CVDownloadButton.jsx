// src/components/cv/CVDownloadButton.jsx
import React from "react";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { usePDF } from "../../hooks/usePDF";
import { detectDevice } from "../../utils/deviceDetection";
import Button from "../ui/Button";

const CVDownloadButton = ({
  // Ajustado: el PDF real existente es /hoja_brandon.pdf en public/
  cvUrl = "/hoja_brandon.pdf",
  filename = "Brandon_Montealegre_CV.pdf",
  className = "",
}) => {
  const { processPDF, loading } = usePDF();
  const device = detectDevice();

  const handleCVClick = () => {
    // Validación rápida para evitar 404 si la ruta se cambia
    if (!cvUrl) return;
    processPDF(cvUrl, {
      filename,
      strategy: device.isMobile ? "download" : "newTab",
      analytics: { track: (e, d) => console.log("Analytics:", e, d) },
    });
  };

  return (
    <Button
      onClick={handleCVClick}
      disabled={loading}
      className={`flex items-center gap-2 ${className}`}
    >
      {device.isMobile ? (
        <FaDownload className="w-4 h-4" />
      ) : (
        <FaEye className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {device.isMobile ? "Descargar CV" : "Ver Curriculum"}
      </span>
      <span className="sm:hidden">
        {device.isMobile ? "Descargar" : "Ver CV"}
      </span>
      <FaFilePdf className="w-4 h-4 opacity-70" />
    </Button>
  );
};

export default CVDownloadButton;
