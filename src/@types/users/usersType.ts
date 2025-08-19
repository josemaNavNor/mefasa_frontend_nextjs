export type UserRegister = {
    message: string;
}

export type UserLogin = {
    message: string;
}

export type UserLoginWith2FA = {
    message: string;
    requires2FA: boolean;
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

export type SignInFormState = {
    email: string;
    password: string;
}

export type SignInWith2FAFormState = {
    email: string;
    password: string;
    token: string;
}
