import { SignInFormState } from "@/@types/users/usersType";
import { API } from "@/services/api/API";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'

export const useLogin = () => {
    const router = useRouter();

    const login = async (data: SignInFormState) => {
        try {
            const response = await API.users.signInApi(data);
            toast.success(response.message === "¡Inicio de sesión exitoso! Redirigiendo...", {
                position: "top-right",
                autoClose: 3000,
            });
            setTimeout(() => {
                router.push('/qr');
            }, 3000);

        } catch (error: unknown) {
            let message = "Ocurrio un error inesperado.";

            if (error instanceof Error) {
                message = (error as any)?.response?.data?.message || message;
            }

            toast.error('Ocurrió un error al iniciar sesión', {
                position: "top-right",
                autoClose: 3000,
            });
            throw error;
        }
    };
    return { login };
}