import { SignUpFormState, UserRegister } from "@/@types/users/usersType";
import { ApiClient } from "../../ApiClient";

export const signUpApi = async (data: SignUpFormState): Promise<UserRegister> => {
  const client = ApiClient.getInstance();

  const response = await client.post<UserRegister>('auth/register', data);

  return response;
}