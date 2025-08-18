import axios from 'axios';

export interface SignInPayload {
	email: string;
	password: string;
}

export interface SignInResponse {
	access_token?: string;
	requiresTwoFactor?: boolean;
	message?: string;
}
//cddq eiez bjgx ogdp
export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/login`,
			payload
		);
		return response.data;
	} catch (error: any) {
		if (error.response) {
			return { message: error.response.data.message || 'Error de inicio de sesión' };
		}
		return { message: 'Error de red o servidor' };
	}
}
