export interface RegisterData {
    email: string
    password: string
    password_confirmation: string
    key: string
}

export interface RegisterResponseError {
    message: string
    errors: {
        email?: string[]
        password?: string[]
        password_confirmation?: string[]
        key?: string[]
    }
} 