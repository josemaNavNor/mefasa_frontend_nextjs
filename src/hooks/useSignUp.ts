import { SignUpFormState } from "@/@types/users/usersType";
import { API } from "@/services/api/API";
import { toast } from 'react-toastify';

export const useRegister = () => {
    const register = async (data: SignUpFormState) => {
        try {
            const response = await API.users.signUpApi(data);
            if (response.message === "Se ha enviado un correo de verificación. Por favor, revise su bandeja de entrada.") {
                toast.success("¡Registro exitoso! Redirigiendo...", {
                    position: "top-right",
                    autoClose: 3000,
                });
                toast.success("Se ha enviado un correo de verificación. Por favor, revise su bandeja de entrada.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error: unknown) {
            let message = "Ocurrió un error inesperado.";

            if (error instanceof Error) {
                message = (error as any)?.response?.data?.message || message;
            }

            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    return { register }
};
