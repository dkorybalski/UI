import { Supervisor } from "../../user/models/supervisor.model";

export interface ExternalLink {
    id: number
    url: string;
    name: string;
    columnHeader: string;
    deadline: string 
}

export interface ExternalLinkData {
    projectId: number;
    projectName: string;
    supervisor: Supervisor;
    externalLinks: ExternalLink[]
}

export interface ExternalLinkFilters {
    searchValue: string;
    supervisorIndexNumber?: string;
}
