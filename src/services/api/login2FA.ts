import axios from 'axios';

export interface Login2FAPayload {
  email: string;
  password: string;
  token: string;
}

export interface Login2FAResponse {
  access_token?: string;
  message?: string;
}

export async function login2FA(payload: Login2FAPayload): Promise<Login2FAResponse> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/login-2fa`,
      payload
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { message: error.response.data.message || 'Error de autenticación 2FA' };
    }
    return { message: 'Error de red o servidor' };
  }
}
