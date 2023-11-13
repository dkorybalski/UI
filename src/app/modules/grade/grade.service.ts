import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { Grade, GradeDetails } from "./models/grade";

@Injectable({
    providedIn: 'root'
})
export class GradeService {
    constructor(private http: HttpClient) { }

    grades$: Observable<Grade[]> = this.http
        .get<Grade[]>('/apigateway/project/grade')
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )

    getGradeDetails(id: number): Observable<GradeDetails> {
            return this.http
                .get<GradeDetails>(`/apigateway/project/${id}/grade`)
                .pipe(
                    retry(3),
                    catchError(
                        (err: HttpErrorResponse) => throwError(() => err))
                )
        }
    

}