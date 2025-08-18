import { useState } from "react";
import { SignUpFormState } from "@/@types/users/usersType";

export default function useSignUpForm() {
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

  return {
    form,
    setForm,
    loading,
    error,
    success,
    handleChange,
    setLoading,
    setError,
    setSuccess
  };
}
