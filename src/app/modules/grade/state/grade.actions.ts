import { createAction, props } from "@ngrx/store";
import { Grade, GradeFilters } from "../models/grade";

export const loadGrades = createAction(
    '[GradeList] Load'
)

export const loadGradesSuccess = createAction(
    '[GradeList API] Load Success',
    props<{grades: Grade[] }>()
)

export const loadGradesFailure = createAction(
    '[GradeList API] Load Fail',
    props<{ error: string }>()
)

export const changeFilters = createAction(
    '[GradeList] Change Filters',
    props<{ filters: GradeFilters }>()
)
