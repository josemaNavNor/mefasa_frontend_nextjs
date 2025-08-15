"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutHeader, { LayoutFooter } from "./layout_header_footer";
import { signIn } from "../../services/api/signIn";
import { login2FA } from "../../services/api/login2FA";
import { getProfile } from "../../services/api/getProfile";
import Cookies from "js-cookie";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [requires2FA, setRequires2FA] = useState(false);
    const [message, setMessage] = useState("");
    const [token2FA, setToken2FA] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            let accessToken = "";
            if (requires2FA) {
                // Enviar código 2FA
                const res = await login2FA({ email, password, token: token2FA });
                if (res.access_token) {
                    Cookies.set("access_token", res.access_token, { expires: 7 });
                    accessToken = res.access_token;
                    setMessage("Inicio de sesión exitoso");
                    setRequires2FA(false);
                    toast.success("¡Bienvenido! Inicio de sesión exitoso");
                } else {
                    setError(res.message || "Código 2FA incorrecto");
                }
            } else {
                // Primer intento de login
                const res = await signIn({ email, password });
                if (res.requiresTwoFactor) {
                    setRequires2FA(true);
                    setMessage(res.message || "Se requiere autenticación de dos factores");
                } else if (res.access_token) {
                    Cookies.set("access_token", res.access_token, { expires: 7 });
                    accessToken = res.access_token;
                    setMessage("Redirigiendo...");
                    toast.success("¡Bienvenido! Inicio de sesión exitoso");
                } else {
                    setError(res.message || "Error desconocido");
                }
            }
            // Si hay token, obtener el userId y perfil
            if (accessToken) {
                // Decodifica el JWT para obtener el userId
                try {
                    const payload = JSON.parse(atob(accessToken.split('.')[1]));
                    const userId = payload.id || payload.userId || payload.sub;
                    if (userId) {
                        const profile = await getProfile(userId);
                        if (profile && profile.two_factor_enable) {
                            router.push("/tickets");
                        } else {
                            router.push("/qr");
                        }
                    }
                } catch {
                    // Si falla la decodificación, no redirige
                }
            }
        } catch (err) {
            setError("Error de red o servidor");
        }
        setLoading(false);
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
                                className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50"
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



