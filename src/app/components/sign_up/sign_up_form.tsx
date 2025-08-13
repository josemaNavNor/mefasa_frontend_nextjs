'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpForm() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombres</Label>
          <Input
            id="name"
            type="text"
            placeholder="Juan Pérez"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last_name">Apellidos</Label>
          <Input
            id="last_name"
            type="text"
            placeholder="García López"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone_number">Número de teléfono</Label>
          <Input
            id="phone_number"
            type="text"
            placeholder="+52 55 1234 5678"
            required
          />
        </div>
      </div>
    </form>
  )
}
