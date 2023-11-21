import { Student } from "../../user/models/student.model";
import { Supervisor } from "../../user/models/supervisor.model";
import { User } from "../../user/models/user.model";
import { ExternalLink } from "./external-link.model";
import { GradeDetails } from "./grade.model";

export interface Project {
    id?: number;
    name: string;
    supervisor: Supervisor,
    accepted: boolean;
    externalLinks?: ExternalLink[];
    firstSemesterGrade?: string | null;
    secondSemesterGrade?: string | null;
    criteriaMet?: boolean;
}

export interface ProjectDetails {
    id?: number;
    name: string;
    description: string
    students: Student[];
    admin: string;
    technologies: string[];
    supervisor: Supervisor;
    accepted: boolean;
    confirmed: boolean;
    externalLinks: ExternalLink[]
}

export interface ProjectFilters {
    searchValue: string;
    supervisorIndexNumber: string | undefined;
    acceptanceStatus: boolean | undefined;
    columns: string[];
    criteriaMetStatus: boolean | undefined;
}

export interface ProjectFormData {
    supervisors: Supervisor[];
    students: Student[];
    user: User;
    projectDetails?: ProjectDetails;
}