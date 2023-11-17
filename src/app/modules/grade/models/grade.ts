export interface Criterion {
    description: string;
    isDisqualifying: boolean;
}

export interface CriteriaGroup {
    id: string;
    name: string;
    selectedCriterion: string;
    criteria: {[key: string]: Criterion}
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