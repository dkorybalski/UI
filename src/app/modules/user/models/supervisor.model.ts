export interface Supervisor {
    email: string;
    name: string,
    indexNumber: string;
    accepted?: boolean;
    initials: string;
    id: string;
}

export interface SupervisorDTO {
    name: string;
    surname: string;
    email: string;
    indexNumber: string;
    pesel: string;
}


