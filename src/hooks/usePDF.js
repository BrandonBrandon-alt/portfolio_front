// src/hooks/usePDF.js
import { useState, useCallback } from "react";
import { handlePDF } from "../utils/pdfHandler";
import { useNotifications } from "../contexts/NotificationContext";

export const usePDF = () => {
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();

  const processPDF = useCallback(
    async (pdfUrl, options = {}) => {
      setLoading(true);
      const result = handlePDF(pdfUrl, {
        ...options,
        onSuccess: (res) => {
          if (res.message)
            notifications.showSuccess(res.message, { duration: 3000 });
          options.onSuccess && options.onSuccess(res);
        },
        onError: (error) => {
          notifications.showError(`Error: ${error.message || error}`, {
            duration: 6000,
          });
          options.onError && options.onError(error);
        },
      });
      setLoading(false);
      return result;
    },
    [notifications]
  );

  return { processPDF, loading };
};

export default usePDF;
