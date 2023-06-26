export interface StudentOverview {
    email: string;
    name: string;
    indexNumber: string;
    project?: {
        name: string;
        coordinator: string;
    }
}