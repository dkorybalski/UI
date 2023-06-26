export interface Student {
    indexNumber: string;
    name: string;
    email: string;
    role?: string;
    accepted?: boolean;
  }
  
export interface StudentDTO {
    name: string;
    surname: string;
    email: string;
    indexNumber: string;
    pesel: string;
}
  