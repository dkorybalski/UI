import { createAction, props } from "@ngrx/store";
import { Project, ProjectDetails, ProjectFilters } from "../models/project";
import { SupervisorAvailability } from "../models/supervisor-availability.model";

export const loadProjects = createAction(
    '[ProjectList] Load'
)

export const loadProjectsSuccess = createAction(
    '[ProjectList API] Load Success',
    props<{ projects: Project[] }>()
)

export const loadProjectsFailure = createAction(
    '[ProjectList API] Load Fail',
    props<{ error: string }>()
)

export const changeFilters = createAction(
    '[ProjectList] Change Filters',
    props<{ filters: ProjectFilters }>()
)

export const addProject = createAction(
    '[ProjectForm] Add',
    props<{ project: ProjectDetails }>()
)

export const addProjectSuccess = createAction(
    '[ProjectForm API] Add Success',
    props<{ project: ProjectDetails }>()
)

export const addProjectFailure = createAction(
    '[ProjectForm API] Add Fail',
    props<{ error: string }>()
)

export const updateProject = createAction(
    '[ProjectForm] Update',
    props<{ project: ProjectDetails }>()
)

export const updateProjectSuccess = createAction(
    '[ProjectForm API] Update Success',
    props<{ project: ProjectDetails }>()
)

export const updateProjectFailure = createAction(
    '[ProjectForm API] Update Fail',
    props<{ error: string }>()
)

export const acceptProject = createAction(
    '[ProjectDetails] Accept Project',
    props<{ projectId: number, role: string }>()
)

export const acceptProjectSuccess = createAction(
    '[ProjectDetails API] Accept Project Success',
    props<{ projectId: number, role: string }>()
)

export const acceptProjectFailure = createAction(
    '[ProjectDetails API] Accept Project Fail',
    props<{ error: string }>()
)

export const unacceptProject = createAction(
    '[ProjectDetails] Unaccept Project',
    props<{ projectId: number, role: string }>()
)

export const unacceptProjectSuccess = createAction(
    '[ProjectDetails API] Unaccept Project Success',
    props<{ projectId: number, role: string }>()
)

export const unacceptProjectFailure = createAction(
    '[ProjectDetails API] Unaccept Project Fail',
    props<{ error: string }>()
)

export const removeProject = createAction(
    '[ProjectDetails] Remove Project',
    props<{ projectId: number}>()
)

export const removeProjectSuccess = createAction(
    '[ProjectDetails API] Remove Project Success',
    props<{ projectId: number}>()
)

export const removeProjectFailure = createAction(
    '[ProjectDetails API] Remove Project Fail',
    props<{ error: string }>()
)

export const changeAdmin = createAction(
    '[ProjectDetails] Change Admin',
    props<{ projectId: number, indexNumber: string }>()
)

export const changeAdminSuccess = createAction(
    '[ProjectDetails API] Change Admin Success',
)

export const changeAdminFailure = createAction(
    '[ProjectDetails API] Change Admin Fail',
    props<{ error: string }>()
)

export const loadSupervisorAvailability = createAction(
    '[SupervisorAvailability] Load'
)

export const loadSupervisorAvailabilitySuccess = createAction(
    '[SupervisorAvailability API] Load Success',
    props<{ supervisorAvailability: SupervisorAvailability[] }>()
)

export const loadSupervisorAvailabilityFailure = createAction(
    '[SupervisorAvailability API] Load Fail',
    props<{ error: string }>()
)

export const updateSupervisorAvailability = createAction(
    '[SupervisorAvailability] Update',
    props<{ supervisorAvailability: SupervisorAvailability[] }>()
)

export const updateSupervisorAvailabilitySuccess = createAction(
    '[SupervisorAvailability API] Update Success',
    props<{ supervisorAvailability: SupervisorAvailability[] }>()
)

export const updateSupervisorAvailabilityFailure = createAction(
    '[SupervisorAvailability API] Update Fail',
    props<{ error: string }>()
)

