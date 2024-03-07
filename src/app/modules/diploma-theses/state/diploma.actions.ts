import {createAction, props} from '@ngrx/store'
import {AddOrUpdateDiploma, Diploma} from '../models/diploma.model'

export const loadDiplomas = createAction(
  '[DiplomaList] Load'
)

export const loadDiplomasSuccess = createAction(
  '[DiplomaList API] Load Success',
  props<{ diplomas: Diploma[] }>()
)

export const loadDiplomasFailure = createAction(
  '[DiplomaList API] Load Fail',
  props<{ error: string }>()
)

export const updateDiploma = createAction(
  '[DiplomaForm] Update',
  props<{ addOrUpdateDiploma: AddOrUpdateDiploma }>()
)

export const updateDiplomaSuccess = createAction(
  '[DiplomaForm API] Update Success',
  props<{ addOrUpdateDiploma: AddOrUpdateDiploma }>()
)

export const updateDiplomaFailure = createAction(
  '[DiplomaForm API] Update Fail',
  props<{ error: string }>()
)
