import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { ChangeGradeResponse, EvaluationCards, PhaseChangeResponse } from "../models/grade.model";

@Injectable({
    providedIn: 'root'
})
export class GradeService {
    constructor(private http: HttpClient) { }

    getEvaluationCards(id: string): Observable<EvaluationCards> {
            return this.http.get<EvaluationCards>(`/pri/project/${id}/evaluation-card`)
                .pipe(
                    retry(3),
                    catchError(
                        (err: HttpErrorResponse) => throwError(() => err))
                )
        }

    changeGrade(projectId: string, evaulationCardId: string, grade: {id: string, selectedCriterion: string | null}): Observable<ChangeGradeResponse>  {
            return this.http
                .put<ChangeGradeResponse>(`/pri/project/${projectId}/evaluation-card/${evaulationCardId}`, grade)
                .pipe(
                    retry(3),
                    catchError(
                        (err: HttpErrorResponse) => throwError(() => err))
                )
        }
    
    publishAllProjects(): Observable<null> {
        return this.http
        .put<null>(`/pri/project/publish-all`, null)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }

    freezeGrading(projectId: string): Observable<PhaseChangeResponse> {
        return this.http
        .put<PhaseChangeResponse>(`/pri/project/${projectId}/evaluation-card/freeze`, null)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }

    openRetakePhase(projectId: string): Observable<PhaseChangeResponse> {
        return this.http
        .put<PhaseChangeResponse>(`/pri/project/${projectId}/evaluation-card/retake`, null)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }

    publish(projectId: string): Observable<PhaseChangeResponse> {
        return this.http
        .put<PhaseChangeResponse>(`/pri/project/${projectId}/evaluation-card/publish`, null)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }

}