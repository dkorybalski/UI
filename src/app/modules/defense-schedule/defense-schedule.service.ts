import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { ChairpersonAssignment, ChairpersonAssignmentAggregated, Project, ProjectDefense, ScheduleConfig, SupervisorAvailabilitySurvey, SupervisorDefenseAssignment, SupervisorDefenseAssignmentAggregated, SupervisorStatistics } from "./models/defense-schedule.model";

@Injectable({
    providedIn: 'root'
})
export class DefenseScheduleService {
    constructor(private http: HttpClient) { }

    public setHttpHeadersForFile(): any {
        const httpHeaders = new HttpHeaders().set(
            'Content-Type',
            'application/json; charset-utf-8'
        );
        return {
            headers: httpHeaders,
            responseType: 'blob',
            observe: 'response'
        }
    }

    getSupervisorAvailabilitySurvey(): Observable<SupervisorAvailabilitySurvey> {
        return this.http
            .get<SupervisorAvailabilitySurvey>(`/pri/schedule/availability/supervisor`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    updateSupervisorDefenseAssignment(slots: {[key: string]: SupervisorDefenseAssignment}): Observable<null> {
        return this.http
            .put<null>(`/pri/schedule/availability/supervisor`, slots)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }


    getSupervisorsStatistics(): Observable<SupervisorStatistics[]> {
        return this.http
            .get<SupervisorStatistics[]>(`/pri/schedule/committee/statistics`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }    

    getProjectDefenses(): Observable<ProjectDefense[]> {
        return this.http
            .get<ProjectDefense[]>(`/pri/schedule/defense`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    getProjects(): Observable<Project[]> {
        return this.http
            .get<Project[]>(`/pri/schedule/defense/projects`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    updateProjectDefense(projectDefenseId: string, projectId: string): Observable<ProjectDefense[]> {
    return this.http
        .patch<ProjectDefense[]>(`/pri/schedule/defense/${projectDefenseId}`, {projectId})
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }

    updateProjectDefenses(defenses: ProjectDefense[]): Observable<ProjectDefense[]> {
        return this.http
            .patch<ProjectDefense[]>(`/pri/schedule/defense`, defenses)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
        }

    getSupervisorsDefenseAssignment(): Observable<SupervisorDefenseAssignmentAggregated> {
        return this.http
            .get<SupervisorDefenseAssignmentAggregated>(`/pri/schedule/committee/supervisor`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }
    
    updateCommitteeSchedule(slots: {[key: string]: SupervisorDefenseAssignment}): 
        Observable<{ statistics: SupervisorStatistics[], defenses: ProjectDefense[] }> {
        return this.http
            .put<{statistics: SupervisorStatistics[], defenses: ProjectDefense[] }>
                (`/pri/schedule/committee/supervisor`, slots)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }    

    setScheduleConfig(config: ScheduleConfig): Observable<null> {
        return this.http
            .post<null>(`/pri/schedule/config`, config)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    
    additionalDay(date: string): Observable<null> {
        return this.http
            .post<null>(`/pri/schedule/defense/modify`, {date})
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    getDefenseSummary(): Observable<any> {
        return this.http
            .get<HttpResponse<Blob>>(`/pri/schedule/defense/summary`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    getChairpersonAssignmentAggregated(): Observable<ChairpersonAssignmentAggregated> {
        return this.http
            .get<ChairpersonAssignmentAggregated>(`/pri/schedule/committee/chairperson`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    getCurrentPhase(): Observable<{phase: string}> {
        return this.http
            .get<{phase: string}>(`/pri/schedule/config/phase`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    updateChairpersonAssignment(assignment: ChairpersonAssignment):
        Observable<{ statistics: SupervisorStatistics[], defenses: ProjectDefense[] }> {
        return this.http
            .put<{ statistics: SupervisorStatistics[], defenses: ProjectDefense[] }>
                (`/pri/schedule/committee/chairperson`, assignment)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }


    openRegistration(): Observable<{phase: string}> {
        return this.http
            .patch<{phase: string}>(`/pri/schedule/config/registration/open`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    closeRegistration(): Observable<{phase: string}> {
        return this.http
            .patch<{phase: string}>(`/pri/schedule/config/registration/close`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    rebuildDefenseSchedule(): Observable<{phase: string}> {
        return this.http
            .put<{phase: string}>(`/pri/schedule/config/rebuild`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 

    archiveDefenseSchedule(): Observable<{phase: string}> {
        return this.http
            .put<{phase: string}>(`/pri/schedule/config/archive`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    } 
    
}