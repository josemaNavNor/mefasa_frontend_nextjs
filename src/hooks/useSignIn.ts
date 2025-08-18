import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "../services/api/signIn";
import { login2FA } from "../services/api/login2FA";
import { getProfile } from "../services/api/getProfile";
import Cookies from "js-cookie";

export default function useSignIn(){
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

    // Valores que usa el componente SignIn
    return {
        email,
        setEmail,
        password,
        setPassword,
        setToken2FA,
        handleSubmit,
        loading,
        requires2FA,
        token2FA,
        setRequires2FA,
        error,
        message,
    };
}