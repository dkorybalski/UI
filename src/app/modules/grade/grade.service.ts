import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { GradeDetails } from "./models/grade";

@Injectable({
    providedIn: 'root'
})
export class GradeService {
    constructor(private http: HttpClient) { }

    getGradeDetails(id: number, semester = 'FIRST'): Observable<GradeDetails> {
            return this.http
                .get<GradeDetails>(`/pri/project/${id}/grade`,
                    {params: new HttpParams().set('semester', semester)})
                .pipe(
                    retry(3),
                    catchError(
                        (err: HttpErrorResponse) => throwError(() => err))
                )
        }
    

}