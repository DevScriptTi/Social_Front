interface ApplicationResponse {
  message: string;
  application: Application;
}

interface Application {
  id: number;
  date: string;
  status: string;
  classment: null | string;
  key: string;
  grade: null | string;
  description: null | string;
  errors: string;
  step: number;
  created_at: string;
  updated_at: string;
  committee_id: number;
  applicant_id: number;
  employee_id: null | number;
  applicant: Applicant;
  committee: Committee;
  housing: Housing;
  files: Files;
  health: Health;
  professional: Professional;
  qrcode: QRCode;
}

interface Applicant {
  id: number;
  name: string;
  last: string;
  date_of_birth: string;
  place_of_birth: string;
  national_id_number: string;
  residence_place: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  status: 'single' | 'married' | 'divorced' | 'widowed';
  children_number: number;
  created_at: string;
  updated_at: string;
  committee_id: number;
  wife: Wife | null;
  photo: null | string;
}

interface Wife {
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

interface Committee {
  id: number;
  username: string;
  name: string;
  last: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  daira_id: number;
  daira: Daira;
}

interface Daira {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  wilaya_id: number;
  wilaya: Wilaya;
}

interface Wilaya {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Housing {
  id: number;
  current_housing_type: 'non_residential_place' | 'collapsing_communal' | 'collapsing_private' | 'with_relatives_or_rented' | 'functional_housing';
  previously_benefited: 'yes' | 'no';
  housing_area: string;
  other_properties: string | null;
  created_at: string;
  updated_at: string;
  application_id: number;
}

interface Files {
  id: number;
  birth_certificate: null | string;
  spouse_birth_certificate: null | string;
  family_individual_certificate: null | string;
  applicant_national_id: null | string;
  spouse_national_id: null | string;
  residence_certificate: null | string;
  employment_unemployment_certificate: null | string;
  spouse_employment_certificate: null | string;
  spouse_salary_certificate: null | string;
  applicant_salary_certificate: null | string;
  non_real_estate_ownership_certificate: null | string;
  medical_certificate: null | string;
  death_divorce_certificate: null | string;
  created_at: string;
  updated_at: string;
  application_id: number;
}

interface Health {
  id: number;
  chronic_illness_disability: 'yes' | 'no';
  type: string | null;
  family_member_illness: 'yes' | 'no';
  relationship: string | null;
  created_at: string;
  updated_at: string;
  application_id: number;
}

interface Professional {
  id: number;
  is_employed: 'yes' | 'no';
  work_nature: string | null;
  current_job: string | null;
  monthly_income: string;
  created_at: string;
  updated_at: string;
  application_id: number;
}

interface QRCode {
  id: number;
  value: string;
  created_at: string;
  updated_at: string;
  application_id: number;
}

interface ApplicantRequest {
  name: string;
  last: string;
  date_of_birth: string;
  place_of_birth: string;
  residence_place: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  status: 'single' | 'married' | 'divorced' | 'widowed';
  children_number: number;
  committee_id?: number;
  wife?: {
    name: string;
    last: string;
    date_of_birth: string;
    place_of_birth: string;
    national_id_number: string;
    residence_place: string;
  };
}

interface ProfessionalRequest {
  is_employed: 'yes' | 'no';
  work_nature: string | null;
  current_job: string | null;
  monthly_income: string;
}

interface HousingRequest {
  current_housing_type: 'non_residential_place' | 'collapsing_communal' | 'collapsing_private' | 'with_relatives_or_rented' | 'functional_housing';
  previously_benefited: 'yes' | 'no';
  housing_area: string;
  other_properties: string | null;
}

interface HealthRequest {
  chronic_illness_disability: 'yes' | 'no';
  type: string | null;
  family_member_illness: 'yes' | 'no';
  relationship: string | null;
}

export type { ApplicationResponse, Application, Applicant, Wife, Committee, Daira, Wilaya, Housing, Files, Health, Professional, QRCode, ApplicantRequest, ProfessionalRequest, HousingRequest, HealthRequest };

