import { createAction, props } from "@ngrx/store";
import { SupervisorAvailability } from "../models/supervisor-availability.model";
import { Project, ProjectDetails, ProjectFilters } from "../models/project.model";

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

export const updateDisplayedColumns = createAction(
    '[ProjectList] Update Displayed Columns',
    props<{ columns: string[] }>()
)

export const updateGradingPhase = createAction(
    '[Project List] Update Grading Phase',
    props<{ projectId: string, phase: string }>()
)

export const addProject = createAction(
    '[ProjectForm] Add',
    props<{ project: ProjectDetails, userRole: string }>()
)

export const addProjectSuccess = createAction(
    '[ProjectForm API] Add Success',
    props<{ project: ProjectDetails, userRole: string }>()
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
    props<{ projectId: string, role: string }>()
)

export const acceptProjectSuccess = createAction(
    '[ProjectDetails API] Accept Project Success',
    props<{ projectId: string, role: string }>()
)

export const acceptProjectFailure = createAction(
    '[ProjectDetails API] Accept Project Fail',
    props<{ error: string }>()
)

export const unacceptProject = createAction(
    '[ProjectDetails] Unaccept Project',
    props<{ projectId: string, role: string }>()
)

export const unacceptProjectSuccess = createAction(
    '[ProjectDetails API] Unaccept Project Success',
    props<{ projectId: string, role: string }>()
)

export const unacceptProjectFailure = createAction(
    '[ProjectDetails API] Unaccept Project Fail',
    props<{ error: string }>()
)

export const removeProject = createAction(
    '[ProjectDetails] Remove Project',
    props<{ projectId: string}>()
)

export const removeProjectSuccess = createAction(
    '[ProjectDetails API] Remove Project Success',
    props<{ projectId: string}>()
)

export const removeProjectFailure = createAction(
    '[ProjectDetails API] Remove Project Fail',
    props<{ error: string }>()
)

export const updateGrade = createAction(
    '[Project Details] Update Grade',
    props<{ semester: string, projectId: string, grade: string, criteriaMet: boolean }>()
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



