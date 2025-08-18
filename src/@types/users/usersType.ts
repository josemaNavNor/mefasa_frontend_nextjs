export type UserRegister = {
    message: string;
}

export type SignUpFormState = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    is_email_verified: boolean;
    two_factor_enable: boolean;
    role_id: number;
}