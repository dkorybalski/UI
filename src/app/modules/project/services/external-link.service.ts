import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError } from "rxjs";
import { ExternalLink } from "../models/external-link.model";

@Injectable({
    providedIn: 'root'
})
export class ExternalLinkService {
    constructor(private http: HttpClient) {}

    columnHeaders$: Observable<string[]> = this.http
        .get<string[]>(`/pri/project/external-link/column-header`)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )

    getExternalLinks(projectId: number): Observable<ExternalLink[]> {
        return this.http
        .get<ExternalLink[]>(`/pri/project/${projectId}/external-link`)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => throwError(() => err))
        )
    }
}