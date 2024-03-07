import {createReducer, on} from '@ngrx/store'
import {loadDiplomasSuccess} from './diploma.actions'
import {DiplomaState, initialState} from './diploma.state'

export const diplomaReducer = createReducer(
  initialState,
  on(loadDiplomasSuccess, (state, action): DiplomaState => {
    return {
      ...state,
      diplomas: action.diplomas
    }
  })
)
