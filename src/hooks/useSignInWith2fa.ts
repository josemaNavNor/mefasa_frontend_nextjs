import { SignInWith2FAFormState } from "@/@types/users/usersType";
import { API } from "@/services/api/API";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'

export const useSignInWith2FA = () => {
    const router = useRouter();

    const signIn = async (data: SignInWith2FAFormState) => {
        try {
            const response = await API.users.signInApiWithToken(data);
            toast.success(response.message === "Inicio de sesion exitoso!", {
                position: "top-right",
                autoClose: 2000,
            });
            router.push('/tickets');
            return response;
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
    return { signIn };
}