'use client';

import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRegister } from "@/hooks/useSingUp";

export default function Register() {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      role_id: 2,
    };

    await register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <ToastContainer />

        <h2 className="text-2xl text-black font-bold text-center mb-2">Regístrate</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Recuerda llenar los datos correctamente como son solicitados para poder continuar.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre de usuario"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nombre de usuario"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-600 font-bold text-center">{error}...</p>}

          <div className="flex justify-between gap-4 mt-4">
            <Link
              href="/"
              className="w-full text-black font-bold text-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Volver
            </Link>
            <button
              type="submit"
              className="w-full font-bold bg-black text-white py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Continuar
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500 font-medium">¿Ya tienes una cuenta?</p>
            <Link
              className="font-bold text-black hover:underline"
              href="/sing_in"
            >
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}