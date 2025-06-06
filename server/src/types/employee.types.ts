export interface Employee {
    id: number;
    name: string;
    company: string;
    city: string;
    phone_number: string;
}

export interface CreateEmployeeInput {
    name: string;
    company: string;
    city: string;
    phone_number: string;
}

export interface UpdateEmployeeInput extends CreateEmployeeInput {
    id: number;
}
