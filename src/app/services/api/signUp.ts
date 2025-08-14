import { useState } from "react";

export interface SignUpFormState {
  name: string;
  last_name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  two_factor_enable: boolean;
  role_id: number;
}

export function useSignUpForm() {
  // Estado del formulario
  const [form, setForm] = useState<SignUpFormState>({
    name: "",
    last_name: "",
    email: "",
    password: "",
    is_email_verified: false,
    two_factor_enable: false,
    role_id: 2
  });

  // Estados auxiliares
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | { message: string }>("");

  // Esta funcion se ejecuta cada vez que el usuario escribe en un input del formulario.
  // Actualiza el estado 'form' con el nuevo valor del campo correspondiente.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  // Esta funcion se ejecuta cuando el usuario envía el formulario de registro.
  // Envía los datos del formulario al backend y gestiona los estados de carga, exito y error.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario (recargar la página)
    setLoading(true);   // Activa el estado de carga
    setError("");      // Limpia cualquier error previo
    setSuccess("");    // Limpia cualquier mensaje de éxito previo
    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrar");
      setSuccess(data); // Guarda el mensaje de éxito
    } catch (err: any) {
      setError(err.message); // Guarda el mensaje de error
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return {
    form,
    setForm,
    loading,
    error,
    success,
    handleChange,
    handleSubmit
  };
}
