import {Diploma} from '../models/diploma.model'

export interface DiplomaState {
  diplomas: Diploma[] | undefined;
}

export const initialState: DiplomaState = {
  diplomas: undefined,
}
