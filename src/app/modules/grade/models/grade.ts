export interface Criterion {
    description: string;
    mandatory: boolean;
}

export interface CriteriaGroup {
    id: string;
    name: string;
    selectedCriterion: number;
    criteria: Criterion[];
}

export interface GradeSection {
    id: string;
    name: string;
    criteriaGroups: CriteriaGroup[];
}

export interface GradeDetails {
    id: string;
    projectName: string;
    semester: 'FIRST' | 'SECOND';
    grade: string | null;
    sections: GradeSection[];
}

export interface GradeFilters {
    searchValue: string;
    supervisorIndexNumber: string | undefined;
    criteriaMetStatus: boolean | undefined;
    semester: 'FIRST' | 'SECOND';
}