
export type Login = {
    email: string
    password: string
}

export interface UserValidation {
    LoginValidation(login: Login);
}
