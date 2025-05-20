export interface Wilaya {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Daira {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    wilaya_id: number;
    wilaya: Wilaya;
}

export interface Photo {
    id: number;
    path: string;
    photoable_type: string;
    photoable_id: number;
    created_at: string;
    updated_at: string;
}

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
    user: User | null;
}

export interface Committee {
    id: number;
    name: string;
    last: string;
    date_of_birth: string;
    daira_id: number;
    created_at: string;
    updated_at: string;
    daira?: {
        id: number;
        name: string;
        wilaya: {
            id: number;
            name: string;
        };
    };
}

export interface CreateCommitteeRequest {
    name: string;
    last: string;
    date_of_birth: string;
    daira_id: number;
}

export interface CommitteeErrorResponse {
    message: string;
    errors: {
        username?: string[];
        name?: string[];
        last?: string[];
        date_of_birth?: string[];
        daira_id?: string[];
    }
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface CommitteeResponse {
    current_page: number;
    data: Committee[];
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