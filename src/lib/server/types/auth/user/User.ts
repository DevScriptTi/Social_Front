export interface Photo {
    id: number
    path: string
    created_at: string
    updated_at: string
}

export interface Keyable {
    id: number
    username: string
    name: string
    last: string
    created_at: string
    updated_at: string
    photo?: Photo
}

export interface Key {
    id: number
    value: string
    status: 'used' | 'unused'
    keyable_type: string
    keyable_id: number
    used_at: string | null
    expires_at: string | null
    created_at: string
    updated_at: string
    keyable: Keyable
}

export interface User {
    id: number
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    key_id: number
    key: Key
}

export interface UserResponse {
    user: User
} 