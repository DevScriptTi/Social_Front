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
    wilaya?: Wilaya;
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
    username: string;
    name: string;
    last: string;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
    daira_id: number;
    daira?: Daira;
}

export interface Employee {
    id: number;
    username: string;
    name: string;
    last: string;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
    daira_id: number;
    committee_id: number;
    applications_count: number;
    daira: Daira;
    committee: Committee;
    photo: Photo;
    key: Key;
}

export interface CreateEmployeeRequest {
    username?: string;
    name: string;
    last: string;
    date_of_birth: string;
}

export interface EmployeeErrorResponse {
    message: string;
    errors: {
        username?: string[];
        name?: string[];
        last?: string[];
        date_of_birth?: string[];
        daira_id?: string[];
        committee_id?: string[];
    }
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedEmployees {
    current_page: number;
    data: Employee[];
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

export interface EmployeeResponse {
    status: string;
    data: PaginatedEmployees;
}