'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    photo_profile: "",
    phone_number: "",
    is_email_verified: false,
    two_factor_enable: false,
    role_id: 1 // Puedes cambiar el valor por defecto según tu lógica
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | { message: string }>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
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
      setSuccess(data);
    } catch (err: any) {
      setError(err.message);
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
          <Label htmlFor="phone_number">Número de teléfono</Label>
          <Input
            id="phone_number"
            type="text"
            placeholder="+52 55 1234 5678"
            required
            value={form.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="photo_profile">Foto de perfil (URL)</Label>
          <Input
            id="photo_profile"
            type="text"
            placeholder="https://..."
            value={form.photo_profile}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role_id">Rol</Label>
          <Input
            id="role_id"
            type="number"
            min={1}
            value={form.role_id}
            onChange={handleChange}
          />
        </div>
        {/* Los campos is_email_verified y two_factor_enable se envían por defecto como false */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{typeof success === "string" ? success : success.message}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </div>
    </form>
  )
}
