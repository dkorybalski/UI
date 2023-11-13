import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GradeState } from "./grade.state";

const getGradeFeatureState = createFeatureSelector<GradeState>('grade');

export const getGrades = createSelector(
    getGradeFeatureState,
    state => state.grades
);

export const getFilters = createSelector(
    getGradeFeatureState,
    state => state.filters
);
