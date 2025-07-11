import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

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
      newErrors.name = 'El nombre es requerido.';
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras y espacios.';
      isValid = false;
    }

    const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido.';
      isValid = false;
    } else if (formData.message.length < 10) {
        newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario.');
      return;
    }

    const toastId = toast.loading("Enviando mensaje...", { autoClose: false });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.update(toastId, { render: '¡Mensaje enviado con éxito! Te responderé pronto.', type: 'success', isLoading: false, autoClose: 5000 });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
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
    <Form onSubmit={handleSubmit} className="hologram-effect w-full max-w-lg p-8 rounded-lg bg-[var(--color-background)]/70 border-2 border-[var(--color-accent-jedi-blue)]/40 shadow-xl shadow-[var(--color-accent-jedi-blue)]/20 space-y-6">
      <div>
        <label htmlFor="name" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2 text-left">Nombre:</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Tu Nombre"
          value={formData.name}
          onChange={handleChange}
          hasError={!!errors.name}
          errorMessage={errors.name}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2 text-left">Correo Electrónico:</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Tu Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          hasError={!!errors.email}
          errorMessage={errors.email}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[var(--color-text-primary)] text-lg font-sans mb-2 text-left">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tu Mensaje"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className={`w-full p-3 rounded-md bg-[var(--color-background)]/60 border-2 ${errors.message ? 'border-[var(--color-accent-sith-red)]' : 'border-[var(--color-accent-jedi-blue)]/50'} text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-jedi-green)] focus:ring-2 focus:ring-[var(--color-accent-jedi-green)]/50 transition-all duration-300 ease-in-out shadow-md`}
        ></textarea>
        {errors.message && <p className="text-[var(--color-accent-sith-red)] text-sm mt-1 text-left">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] shadow-[0_0_10px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_20px_var(--color-accent-jedi-blue)]">
        Enviar Mensaje
      </Button>
    </Form>
  );
};

export default ContactForm;