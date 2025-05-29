export interface ApiResponse<T> {
    status: string;
    data: T;
  }
  
  export interface PaginatedApplications {
    current_page: number;
    data: Application[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  export interface Application {
    id: number;
    date: string;
    status: string;
    classment: string;
    key: string;
    grade: string | null;
    description: string;
    errors: any; // Could be more specific if you know the error structure
    step: number;
    created_at: string;
    updated_at: string;
    committee_id: number;
    applicant_id: number;
    employee_id: number;
    social_id: number;
    applicant: Applicant;
    housing: Housing;
    files: any; // Could be more specific if you know the file structure
    health: Health;
    professional: Professional;
    qrcode: QRCode;
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
    wife: Wife | null;
    photo: any; // Could be more specific if you know the photo structure
  }
  
  export interface Wife {
    id: number;
    name: string;
    last: string;
    date_of_birth: string;
    place_of_birth: string;
    national_id_number: string;
    residence_place: string;
    created_at: string;
    updated_at: string;
    applicant_id: number;
  }
  
  export interface Housing {
    id: number;
    current_housing_type: string;
    previously_benefited: string;
    housing_area: string;
    other_properties: string;
    created_at: string;
    updated_at: string;
    application_id: number;
  }
  
  export interface Health {
    id: number;
    chronic_illness_disability: string;
    type: string;
    family_member_illness: string;
    relationship: string;
    created_at: string;
    updated_at: string;
    application_id: number;
  }
  
  export interface Professional {
    id: number;
    is_employed: string;
    work_nature: string;
    current_job: string;
    monthly_income: string;
    created_at: string;
    updated_at: string;
    application_id: number;
  }
  
  export    interface QRCode {
    id: number;
    value: string;
    created_at: string;
    updated_at: string;
    application_id: number;
  }
  
  // The complete response type would be:
  export type ApplicationsResponse = ApiResponse<PaginatedApplications>;