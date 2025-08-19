"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutHeader, { LayoutFooter } from "./layout_header_footer";
import { useState } from "react";
import { useLogin } from "@/hooks/useSignIn";
import {useSignInWith2FA} from "@/hooks/useSignInWith2fa";


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token2FA, setToken2FA] = useState('');
    const [loading, setLoading] = useState(false);
    const [requires2FA, setRequires2FA] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useLogin();
    const { signIn } = useSignInWith2FA();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
        if (requires2FA) {
            // Login con 2FA
            await signIn({ email, password, token: token2FA });
        } else {
            // Login normal
            await login({ email, password });
        }
    } catch (err: any) {
        setError('Error al iniciar sesión');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-sm">
                <LayoutHeader />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={loading || requires2FA}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    disabled={loading || requires2FA}
                                />
                            </div>
                            {requires2FA && (
                                <div className="grid gap-2">
                                    <Label htmlFor="token2fa">Código 2FA</Label>
                                    <Input
                                        id="token2fa"
                                        type="text"
                                        required
                                        value={token2FA}
                                        onChange={e => setToken2FA(e.target.value)}
                                        disabled={loading}
                                        placeholder="Ingresa tu código de autenticación"
                                    />
                                </div>
                            )}
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            {message && <div className="text-green-600 text-sm">{message}</div>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50 hover:bg-blue-700 transition-colors"
                                disabled={loading}
                            >
                                {loading ? "Ingresando..." : "Iniciar sesión"}
                            </button>
                        </div>
                    </form>
                </CardContent>
                <LayoutFooter />
            </Card>
        </div>
    );
}



