import React, { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido.";
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "El nombre solo puede contener letras y espacios.";
      isValid = false;
    }

    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de correo electrónico inválido.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido.";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    const toastId = toast.loading("Enviando mensaje...", { autoClose: false });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.update(toastId, {
          render: "¡Mensaje enviado con éxito! Te responderé pronto.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        toast.update(toastId, {
          render: `Error al enviar: ${
            errorData.error || "Inténtalo de nuevo."
          }`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.update(toastId, {
        render: "Error de conexión. Por favor, inténtalo más tarde.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Marco holográfico externo */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent-jedi-blue)]/35 bg-gradient-to-br from-[var(--color-accent-jedi-blue)]/10 via-transparent to-[var(--color-accent-jedi-green)]/10 backdrop-blur-sm group-hover:border-[var(--color-accent-jedi-blue)]/60 transition-all duration-500" />
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,240,255,0.15),rgba(0,255,159,0.15),rgba(0,240,255,0.15))] blur" />
      {/* Esquinas brillantes */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-tl-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-tr-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent-jedi-green)] rounded-bl-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-jedi-green)] rounded-br-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
      {/* Partículas internas */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-accent-jedi-green)] rounded-full opacity-40 animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 p-10 w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-mono tracking-wider text-[var(--color-accent-jedi-green)] bg-[var(--color-accent-jedi-green)]/10 px-3 py-1 rounded-full border border-[var(--color-accent-jedi-green)]/30">
            INPUT_CHANNEL
          </span>
          <span className="text-[10px] font-mono text-[var(--color-accent-jedi-blue)]/60 tracking-widest">
            READY
          </span>
        </div>
        <Form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
          aria-describedby="form-status"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-mono tracking-wider mb-2 text-[var(--color-accent-jedi-blue)]"
            >
              NOMBRE
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              hasError={!!errors.name}
              errorMessage={errors.name}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono tracking-wider mb-2 text-[var(--color-accent-jedi-blue)]"
            >
              EMAIL
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              hasError={!!errors.email}
              errorMessage={errors.email}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono tracking-wider mb-2 text-[var(--color-accent-jedi-blue)]"
            >
              MENSAJE
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tu Mensaje"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className={`w-full p-3 rounded-md bg-[var(--color-background)]/60 border-2 ${
                errors.message
                  ? "border-[var(--color-accent-sith-red)]"
                  : "border-[var(--color-accent-jedi-blue)]/40"
              } text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-jedi-green)] focus:ring-2 focus:ring-[var(--color-accent-jedi-green)]/40 transition-all duration-300 ease-in-out shadow-md`}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            ></textarea>
            {errors.message && (
              <p
                id="message-error"
                className="text-[var(--color-accent-sith-red)] text-sm mt-1 text-left"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="group relative overflow-hidden w-full border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] rounded-lg font-mono font-bold py-3 px-6 transition-all duration-500 bg-transparent hover:bg-[var(--color-accent-jedi-blue)] shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span className="relative z-10 tracking-wider">ENVIAR_MENSAJE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
          <div id="form-status" aria-live="polite" className="sr-only">
            {submitted && "Mensaje enviado con éxito"}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
