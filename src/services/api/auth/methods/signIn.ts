import {SignInFormState, UserLogin, UserLoginWith2FA, SignInWith2FAFormState} from "@/@types/users/usersType";
import { ApiClient } from "../../ApiClient";

export const signInApi = async (data: SignInFormState): Promise<UserLogin> => {
    const client = ApiClient.getInstance();

    const response = await client.post<UserLogin>('auth/login', data);

    return response;
}


export const signInApiWithToken = async (data: SignInWith2FAFormState): Promise<UserLoginWith2FA> => {
    const client = ApiClient.getInstance();

    const response = await client.post<UserLoginWith2FA>('auth/login-2fa', data);

    return response;
}
