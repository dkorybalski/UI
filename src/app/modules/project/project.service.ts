import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { Project, ProjectDetails } from "./models/project";
import { Supervisor } from "../user/models/supervisor.model";
import { SupervisorAvailability } from "./models/supervisor-availability.model";
import { Student } from "../user/models/student.model";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private http: HttpClient) { }

    getProjectDetails(id: number): Observable<ProjectDetails> {
        return this.http
            .get<ProjectDetails>(`/pri/project/${id}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    removeProject(id: number): Observable<null> {
        return this.http
            .delete<null>(`/pri/project/${id}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }
    

    addProject(project: ProjectDetails): Observable<ProjectDetails> {
        return this.http
            .post<ProjectDetails>(`/pri/project`, project)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    updateProject(project: ProjectDetails): Observable<ProjectDetails>  {
        return this.http
            .put<ProjectDetails>(`/pri/project/${project.id}`, project)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    updateSupervisorAvailability(supervisorAvailability: SupervisorAvailability[]): Observable<SupervisorAvailability[]> {
        return this.http
            .put<SupervisorAvailability[]>('/pri/project/supervisor/availability', supervisorAvailability)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    acceptProject(projectId: number): Observable<null> {
        return this.http
            .patch<null>(`/pri/project/${projectId}/accept`, null)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    unacceptProject(projectId: number): Observable<null> {
        return this.http
            .patch<null>(`/pri/project/${projectId}/unaccept`, null)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    projects$: Observable<Project[]> = this.http
        .get<Project[]>('/pri/project')
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )

    supervisors$: Observable<Supervisor[]> = this.http
        .get<Supervisor[]>('/pri/user/supervisor', { withCredentials: true })
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )

     students$: Observable<Student[]> = this.http
        .get<Student[]>('/pri/user/student')
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )

    supervisorsAvailability$: Observable<SupervisorAvailability[]> = 
        this.http
            .get<SupervisorAvailability[]>('/pri/project/supervisor/availability')
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )


}