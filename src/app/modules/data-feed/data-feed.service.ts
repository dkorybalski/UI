import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataFeedService {
    constructor(private http: HttpClient) { }

    uploadStudents(data: FormData): Observable<null>  {
        return this.http
            .post<null>(`/apigateway/data/import/student`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

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

    uploadSupervisors(data: FormData): Observable<null>  {
        return this.http
            .post<null>(`/apigateway/data/import/supervisor`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    exportStudents(): Observable<any> {
        return this.http
            .get<HttpResponse<Blob>>(`/apigateway/data/export/student`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }
}