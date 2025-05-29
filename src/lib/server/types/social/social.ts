export interface Social {
    id: number;
    name: string;
    last: string;
    max_application: number;
    number_of_application: number;
    created_at: string;
    updated_at: string;
    committee_id: number;
}

export interface CreateSocialRequest {
    name: string;
    max_application: number;
}

export interface SocialErrorResponse {
    message: string;
    errors: {
        name?: string[];
        max_application?: string[];
    }
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedSocials {
    current_page: number;
    data: Social[];
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

export interface SocialResponse {
    status: string;
    data: PaginatedSocials;
}