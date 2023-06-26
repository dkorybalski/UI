import { createReducer, on } from '@ngrx/store';
import { changeFilters, loadProjectsSuccess, loadSupervisorAvailabilitySuccess, updateProjectSuccess, updateSupervisorAvailabilitySuccess } from './project.actions'
import { initialState, ProjectState } from './project.state';


export const projectReducer = createReducer(
    initialState,
    on(loadProjectsSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: action.projects
        }
    }),
    on(changeFilters, (state, action): ProjectState => {
        return {
            ...state,
            filters: action.filters
        }
    }),
    on(loadSupervisorAvailabilitySuccess, (state, action): ProjectState => {
        return {
            ...state,
            supervisorsAvailability: action.supervisorAvailability
        }
    })
);