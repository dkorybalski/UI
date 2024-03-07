import {createFeatureSelector, createSelector} from '@ngrx/store'
import {DiplomaState} from './diploma.state'

const getDiplomaFeatureState = createFeatureSelector<DiplomaState>('diploma')

export const getDiplomas = createSelector(
  getDiplomaFeatureState,
  state => state.diplomas
)
