export interface Criterion {
    description: string;
    isDisqualifying: boolean;
}

export interface CriteriaGroup {
    id: string;
    name: string;
    modificationDate: string | null; // 21.01.2021 | null
    gradeWeight: string;
    selectedCriterion: string | null;
    criteria: {[key: string]: Criterion}
}

export interface GradeSection {
    id: string;
    name: string;
    gradeWeight: string;
    criteriaGroups: CriteriaGroup[];
}

export interface EvaluationCards {
   [key: string]: { // SEMESTER
        [key: string]: EvaluationCard // PHASE
   }
}

export interface EvaluationCard {
    id: string
    grade: string | null;
    sections: GradeSection[];
    active: boolean;
    editable: boolean,
    visible: boolean,
    criteriaMet: boolean,
}

export interface PhaseChangeResponse {
    phase: string;
    evaluationCards:  EvaluationCards;
}

export interface ChangeGradeResponse {
    grade: string;
    criteriaMet: boolean;
}
