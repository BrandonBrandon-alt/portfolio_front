// src/components/certificates/CertificatesGrid.jsx
import React from "react";
import { useModal } from "../../hooks/useModal";
import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

const CertificatesGrid = ({ certificates }) => {
  const {
    isOpen,
    content: selectedCertificate,
    openModal,
    closeModal,
  } = useModal();
  const handleCertificateSelect = (certificate) => openModal(certificate);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.id || index}
            certificate={certificate}
            index={index}
            onSelect={handleCertificateSelect}
          />
        ))}
      </div>
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default CertificatesGrid;
