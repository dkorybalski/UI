import { createReducer, on } from '@ngrx/store';
import { changeFilters, loadGradesSuccess } from './grade.actions'
import { GradeState, initialState } from './grade.state';

export const gradeReducer = createReducer(
    initialState,
    on(loadGradesSuccess, (state, action): GradeState => {
        return {
            ...state,
            grades: action.grades
        }
    }),
    on(changeFilters, (state, action): GradeState => {
        return {
            ...state,
            filters: action.filters
        }
    })
);