import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify'; // Import toast

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Nuevo estado para los errores de validación
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar el error cuando el usuario empieza a escribir de nuevo
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

    // Validación del Nombre (solo letras y espacios)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido.';
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras y espacios.';
      isValid = false;
    }

    // Validación del Correo Electrónico
    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido.';
      isValid = false;
    }

    // Validación del Mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido.';
      isValid = false;
    } else if (formData.message.length < 10) { // Ejemplo: mínimo 10 caracteres
        newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ejecutar la validación antes de enviar
    if (!validateForm()) {
      console.log('Errores de validación:', errors);
      // Puedes mostrar un toast o alerta aquí si lo deseas
      toast.error('Por favor, corrige los errores en el formulario.');
      return; // Detener el envío si la validación falla
    }

    const toastId = toast.loading("Enviando mensaje...", { autoClose: false }); // Show loading toast

    console.log('Formulario enviado:', formData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.update(toastId, { render: '¡Mensaje enviado con éxito! Te responderé pronto.', type: 'success', isLoading: false, autoClose: 5000 });
        setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
        setErrors({}); // Limpiar errores después de un envío exitoso
      } else {
        const errorData = await response.json();
        toast.update(toastId, { render: `Error al enviar: ${errorData.error || 'Inténtalo de nuevo.'}`, type: 'error', isLoading: false, autoClose: 5000 });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast.update(toastId, { render: 'Error de conexión. Por favor, inténtalo más tarde.', type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-5xl md:text-6xl font-display text-[var(--color-text-primary)] text-center mb-12 lightsaber-underline"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        Contáctame
      </motion.h1>

      <Form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="name" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2">Nombre:</label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-red-500' : ''}
          />
          {/* Mostrar mensaje de error */}
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Campo Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2">Correo Electrónico:</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Tu Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Campo Mensaje */}
        <div>
          <label htmlFor="message" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tu Mensaje"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className={`w-full p-3 rounded-md bg-[var(--color-background)]/60 border-2 ${errors.message ? 'border-red-500' : 'border-[var(--color-accent-jedi-blue)]/50'} text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-jedi-green)] focus:ring-2 focus:ring-[var(--color-accent-jedi-green)]/50 transition-all duration-300 ease-in-out shadow-md`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </Form>
    </motion.div>
  );
};

export default ContactFormSection;
