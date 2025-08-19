import { signUpApi } from './auth/methods/signUp';
import { signInApi } from './auth/methods/signIn';
import { signInApiWithToken } from './auth/methods/signIn';

export const API = {
    users: {
        signUpApi,
        signInApi,
        signInApiWithToken
    }
}