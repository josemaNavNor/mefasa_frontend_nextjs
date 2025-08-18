'use client'

import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSignUpForm from "../../hooks/useSignUpForm";
import { SelectRoles } from "../role/select_rol";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Generado por crear próxima aplicación",
};

export default function SignUpForm() {
  // Utiliza el custom hook para manejar el estado y la lógica del formulario de registro
  const {
    form,
    setForm,
    loading,
    error,
    success,
    handleChange,
    setLoading,
    setError,
    setSuccess
  } = useSignUpForm();

  // Importa la función de API
  const { signUpApi } = require("../../services/api/signUp");

  // Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await signUpApi(form);
      setSuccess(data);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Error al registrar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombres</Label>
          <Input
            id="name"
            type="text"
            placeholder="Juan Pérez"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="last_name">Apellidos</Label>
          <Input
            id="last_name"
            type="text"
            placeholder="García López"
            required
            value={form.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input id="password" type="password" required value={form.password} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Rol</Label>
          <SelectRoles value={form.role_id} setForm={setForm} />
        </div>

        {/* Los campos is_email_verified y two_factor_enable se envian por defecto como false */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{typeof success === "string" ? success : success.message}</div>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50 hover:bg-blue-700 transition-colors" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <CardFooter className="flex-col gap-2">
          <Link href="/sign_in" className="w-full">
            <Button variant="link" className="w-full" asChild>
              <span>¿Ya tienes una cuenta? Iniciar sesión</span>
            </Button>
          </Link>
        </CardFooter>

      </div>
    </form>
  )
}
