// src/hooks/useModal.js
import { useState, useCallback } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = useCallback((modalContent) => {
    setContent(modalContent);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    document.body.style.overflow = "unset";
  }, []);

  return { isOpen, content, openModal, closeModal };
};

export default useModal;
