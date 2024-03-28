import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataFeedService {
    constructor(private http: HttpClient) { }

    uploadStudents(data: FormData): Observable<null>  {
        return this.http
            .post<null>(`/pri/data/import/student`, data)
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
            .post<null>(`/pri/data/import/supervisor`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    uploadCriteria(data: FormData): Observable<null>  {
        return this.http
            .post<null>(`/pri/data/import/criteria`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }


    exportStudents(): Observable<any> {
        return this.http
            .get<HttpResponse<Blob>>(`/pri/data/export/student`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    exportCriteria(): Observable<any> {
        return this.http
            .get<HttpResponse<Blob>>(`/pri/data/export/criteria`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

    exportGrades(): Observable<any> {
        return this.http
            .get<HttpResponse<Blob>>(`/pri/data/export/grades`, this.setHttpHeadersForFile())
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            )
    }

  exportDiplomas(): Observable<any> {
    return this.http
      .get<HttpResponse<Blob>>(`/pri/project-diplomas/export`, this.setHttpHeadersForFile())
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }
}
