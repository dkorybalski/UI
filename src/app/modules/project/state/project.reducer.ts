import { createReducer, on } from '@ngrx/store';
import { acceptProjectSuccess, addProjectSuccess, changeFilters, loadProjectsSuccess, loadSupervisorAvailabilitySuccess, removeProjectSuccess, unacceptProjectSuccess, updateDisplayedColumns, updateGrade, updateGradingPhase, updateProjectSuccess, updateSupervisorAvailabilitySuccess } from './project.actions'
import { initialState, ProjectState } from './project.state';
import { act } from '@ngrx/effects';


export const projectReducer = createReducer(
    initialState,
    on(loadProjectsSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: action.projects
        }
    }),
    
    on(addProjectSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!, {
                id: action.project.id,
                name: action.project.name,
                supervisor: action.project.supervisor,
                accepted: action.userRole === 'COORDINATOR'
            }]
        }
    }),
    on(updateProjectSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].map(project => {
                if (project.id === action.project.id) {
                    return {
                        id: action.project.id,
                        name: action.project.name,
                        supervisor: action.project.supervisor,
                        accepted: action.project.accepted
                    }
                }
                return project;
            })
        }
    }),
    on(removeProjectSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].filter(project => project.id !== action.projectId)
        }
    }),
    on(updateGradingPhase, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].map(project => {
                if (project.id === action.projectId) {
                    return {
                        ...project,
                        evaluationPhase: action.phase
                    }
                }
                return project;
            })
        }
    }),
    on(acceptProjectSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].map(project => {
                if (project.id === action.projectId) {
                    return {
                        ...project,
                        accepted: true
                    }
                }
                return project;
            })
        }
    }),
    on(unacceptProjectSuccess, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].map(project => {
                if (project.id === action.projectId) {
                    return {
                        ...project,
                        accepted: false
                    }
                }
                return project;
            })
        }
    }),
    on(changeFilters, (state, action): ProjectState => {
        return {
            ...state,
            filters: action.filters
        }
    }),
    on(updateDisplayedColumns, (state, action): ProjectState => {
        return {
            ...state,
            filters: {...state.filters, columns: action.columns }
        }
    }),
    on(loadSupervisorAvailabilitySuccess, (state, action): ProjectState => {
        return {
            ...state,
            supervisorsAvailability: action.supervisorAvailability
        }
    }),
    on(updateSupervisorAvailabilitySuccess, (state, action): ProjectState => {
        return {
            ...state,
            supervisorsAvailability: action.supervisorAvailability
        }
    }),
    on(updateGrade, (state, action): ProjectState => {
        return {
            ...state,
            projects: [...state.projects!].map(project => {
                if (String(project.id) === String(action.projectId)) {
                    return {
                        ...project,
                        criteriaMet: action.criteriaMet,
                        firstSemesterGrade: action.semester === 'FIRST' ? action.grade : project.firstSemesterGrade,
                        secondSemesterGrade: action.semester === 'SECOND' ? action.grade : project.secondSemesterGrade
                    }
                }
                return project;
            }) 
        }
    })
);