export type LoginData = {
    email: string;
    password: string;
}

export type LoginResponseError = {
    message : string,
    errors : {
        email ? : string[],
        password ? : string[]
    }
}