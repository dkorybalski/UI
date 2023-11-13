import * as AppState from '../../../app.state';
import { Grade, GradeFilters } from '../models/grade';

export interface State extends AppState.State {
    projectModule: GradeState
}

export interface GradeState {
    grades: Grade[] | undefined;
    filters: GradeFilters;
}

export const initialState: GradeState = {
    grades: undefined,
    filters: {
        searchValue: '',
        semester: 'FIRST',
        supervisorIndexNumber: undefined,
        criteriaMetStatus: undefined,
    },
}