import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, Observable, retry, throwError} from 'rxjs'
import {AddOrUpdateDiploma, AddOrUpdateDiplomaChapter, Diploma} from './models/diploma.model'

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {
  constructor(private http: HttpClient) {
  }

  diplomas$: Observable<Diploma[]> = this.http
    .get<Diploma[]>('/pri/project-diplomas')
    .pipe(
      retry(3),
      catchError(
        (err: HttpErrorResponse) => throwError(() => err))
    )

  getDiplomaByProjectId(projectId: number): Observable<Diploma | undefined> {
    return this.http
      .get<Diploma>('/pri/project-diplomas/' + projectId)
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }

  updateDiploma(addOrUpdateDiploma: AddOrUpdateDiploma): Observable<AddOrUpdateDiploma> {
    return this.http
      .put<AddOrUpdateDiploma>(`/pri/project-diplomas`, addOrUpdateDiploma)
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }

  updateDiplomaChapter(addOrUpdateDiplomaChapter: AddOrUpdateDiplomaChapter): Observable<AddOrUpdateDiplomaChapter> {
    return this.http
      .put<AddOrUpdateDiplomaChapter>(`/pri/project-diplomas/chapters`, addOrUpdateDiplomaChapter)
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }
}
