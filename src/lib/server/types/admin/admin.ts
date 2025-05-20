export interface User {
    id: number;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    key_id: number;
}

export interface Key {
    id: number;
    value: string;
    status: 'used' | 'unused';
    keyable_type: string;
    keyable_id: number;
    used_at: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Admin {
    id: number;
    username: string;
    name: string;
    last: string;
    key?: Key;
    created_at: string;
    updated_at: string;
}

export interface CreateAdminRequest {
    name: string;
    last: string;
}

export interface AdminErrorResponse {
    message: string;
    errors: {
        username?: string[];
        name?: string[];
        last?: string[];
        email?: string[];
        password?: string[];
        key?: string[];
    }
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface AdminResponse {
    current_page: number;
    data: Admin[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}