import axios from "axios";

export interface SignUpFormState {
  name: string;
  last_name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  two_factor_enable: boolean;
  role_id: number;
}

export async function signUpApi(form: SignUpFormState) {
  const response = await axios.post("http://localhost:4000/api/v1/auth/register", form);
  return response.data;
}
