import { createReducer, on } from '@ngrx/store';
import { UserState, initialState } from './user.state';
import { loadUserSuccess } from './user.actions';
import { acceptProjectSuccess, addProjectSuccess, changeAdminSuccess, removeProjectSuccess, unacceptProjectSuccess, updateProjectSuccess } from '../../project/state/project.actions';



export const userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, action): UserState => {
        return {
            ...state,
            ...action.user,
            logged: true,
            selectedStudyYear: action.user.studyYears[0],
        }
    }),
    on(changeAdminSuccess, (state): UserState => {
        return {
            ...state,
            role: state.role === 'PROJECT_ADMIN' ? 'STUDENT' : state.role
        }
    }),
    on(updateProjectSuccess, (state, action): UserState => {
        return {
            ...state,
            role: (state.role === 'PROJECT_ADMIN' && (action.project.admin !== state.indexNumber))
                ? 'STUDENT' : state.role
        }
    }),
    on(addProjectSuccess, (state, action): UserState => {
        return {
            ...state,
            acceptedProjects: [action.project.id!],
            role: 'PROJECT_ADMIN'
        }
    }),
    on(acceptProjectSuccess, (state, action): UserState => {
        return {
            ...state,
            acceptedProjects: [...state.acceptedProjects, action.projectId]
        }
    }),
    on(removeProjectSuccess, (state, action): UserState => {
        return {
            ...state,
            role: state.role === 'PROJECT_ADMIN' ? 'STUDENT' : state.role,
            acceptedProjects: [...state.acceptedProjects].filter(id => id !== action.projectId),
            projects: [...state.projects].filter(id => id !== action.projectId),
        }
    }),
    on(unacceptProjectSuccess, (state, action): UserState => {
        return {
            ...state,
            acceptedProjects: [...state.acceptedProjects].filter(id => id !== action.projectId)
        }
    }),

    
);