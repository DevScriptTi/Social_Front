export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Applicant {
    id: number;
    name: string;
    last: string;
    date_of_birth: string;
    place_of_birth: string;
    national_id_number: string;
    residence_place: string;
    email: string;
    phone: string;
    gender: string;
    status: string;
    children_number: number;
    created_at: string;
    updated_at: string;
    committee_id: number;
}

export interface Application {
    id: number;
    date: string;
    status: string;
    classment: number | null;
    key: string;
    grade: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
    committee_id: number;
    applicant_id: number;
    employee_id: number | null;
    applicant: Applicant;
}

export interface PaginatedApplications {
    current_page: number;
    data: Application[];
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

export interface ApplicationResponse {
    applications: PaginatedApplications;
}
