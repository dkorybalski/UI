export interface User {
    indexNumber: string;
    name: string;
    email: string;
    role: "STUDENT" | "SUPERVISOR" | "COORDINATOR" | "PROJECT_ADMIN";
    studyYears: string[];
    projects: number[];
    acceptedProjects: number[];
}