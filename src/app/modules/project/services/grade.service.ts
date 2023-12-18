import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { EvaluationCards } from "../models/grade.model";

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

    changeGrade(projectId: string, evaulationCardId: string, grade: {id: string, selectedCriterion: string | null}): Observable<null>  {
            return this.http
                .put<null>(`/pri/project/${projectId}/evaluation-card/${evaulationCardId}`, grade)
                .pipe(
                    retry(3),
                    catchError(
                        (err: HttpErrorResponse) => throwError(() => err))
                )
        }
    

}