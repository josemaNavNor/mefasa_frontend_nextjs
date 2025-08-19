'use client';

import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRegister } from "@/hooks/useSignUp";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import LogoMefasa from "@/components/ui/img";
// import { setTimeout } from "timers/promises";

export default function Register() {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  //const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useRegister();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const data = {
      name: name,
      last_name: last_name,
      email: email,
      password: password,
      is_email_verified: false,
      two_factor_enable: false,
      role_id: 1,
    };

    await register(data);

    // Borrar el formulario
    setTimeout(() => {
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm">
        <LogoMefasa />
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Regístrate</h2>
          <p className="text-sm text-gray-500 text-center">
            Recuerda llenar los datos correctamente como son solicitados para poder continuar.
          </p>
        </CardHeader>
        <CardContent>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nombre de usuario"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">Apellidos</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Apellidos"
                  required
                  value={last_name}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Continuar
                </button>
                {/*                         <Link
                            href="/"
                            className="w-full text-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition-colors"
                        >
                            Volver
                        </Link>*/}

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <p className="text-sm text-gray-500 mb-1">¿Ya tienes una cuenta?</p>
            <Link
              className="text-sm underline-offset-4 hover:underline"
              href="/sign_in"
            >
              Iniciar sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}