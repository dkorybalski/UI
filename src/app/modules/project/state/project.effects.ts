import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { addProject, addProjectSuccess, addProjectFailure, loadProjects, loadProjectsFailure, loadProjectsSuccess, loadSupervisorAvailability, loadSupervisorAvailabilityFailure, loadSupervisorAvailabilitySuccess, updateProject, updateProjectSuccess, updateProjectFailure, updateSupervisorAvailability, updateSupervisorAvailabilityFailure, updateSupervisorAvailabilitySuccess, acceptProject, acceptProjectSuccess, unacceptProject, unacceptProjectSuccess, acceptProjectFailure, unacceptProjectFailure, removeProject, removeProjectSuccess, removeProjectFailure } from './project.actions';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) { }

    loadProjects$ = createEffect(() => this.actions$
        .pipe(
            ofType(loadProjects),
            mergeMap(() => this.projectService.projects$
                .pipe(
                    map(projects => loadProjectsSuccess({projects})),
                    catchError(error => of(loadProjectsFailure({ error })))
                )
            )
        )
    );

    loadSupervisorAvailability$ = createEffect(() => this.actions$
        .pipe(
            ofType(loadSupervisorAvailability),
            mergeMap(() => this.projectService.supervisorsAvailability$
                .pipe(
                    map(supervisorAvailability => loadSupervisorAvailabilitySuccess({supervisorAvailability})),
                    catchError(error => of(loadSupervisorAvailabilityFailure({ error })))
                )
            )
        )
    );

    updateSupervisorAvailability$ = createEffect(() => this.actions$
        .pipe(
            ofType(updateSupervisorAvailability),
            mergeMap((action) => this.projectService.updateSupervisorAvailability(action.supervisorAvailability)
                .pipe(
                    map(() => updateSupervisorAvailabilitySuccess({supervisorAvailability: action.supervisorAvailability})),
                    catchError(error => of(updateSupervisorAvailabilityFailure({ error })))
                )
            )
        )
    )  

    addProject$ = createEffect(() => this.actions$
        .pipe(
            ofType(addProject),
            mergeMap((action) => this.projectService.addProject(action.project)
                .pipe(
                    map((project) => addProjectSuccess({project, userRole: action.userRole})),
                    catchError(error => of(addProjectFailure({ error })))
                )
            )
        )
    )

    removeProject$ = createEffect(() => this.actions$
        .pipe(
            ofType(removeProject),
            mergeMap((action) => this.projectService.removeProject(action.projectId)
                .pipe(
                    map(() => removeProjectSuccess({projectId: action.projectId})),
                    catchError(error => of(removeProjectFailure({ error })))
                )
            )
        )
    )
    acceptProject$ = createEffect(() => this.actions$
        .pipe(
            ofType(acceptProject),
            mergeMap((action) => this.projectService.acceptProject(action.projectId)
                .pipe(
                    map(() => acceptProjectSuccess({projectId: action.projectId, role: action.role})),
                    catchError(error => of(acceptProjectFailure({ error })))
                )
            )
        )
    )

    unacceptProject$ = createEffect(() => this.actions$
        .pipe(
            ofType(unacceptProject),
            mergeMap((action) => this.projectService.unacceptProject(action.projectId)
                .pipe(
                    map(() => unacceptProjectSuccess({projectId: action.projectId, role: action.role})),
                    catchError(error => of(unacceptProjectFailure({ error })))
                )
            )
        )
    )

    updateProject$ = createEffect(() => this.actions$
        .pipe(
            ofType(updateProject),
            mergeMap((action) => this.projectService.updateProject(action.project)
                .pipe(
                    map(() => updateProjectSuccess({project: action.project})),
                    catchError(error => of(updateProjectFailure({ error })))
                )
            )
        )
    )

}