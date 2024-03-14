import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, delay, Observable, of, retry, throwError} from 'rxjs'
import {AddOrUpdateDiploma, AddOrUpdateDiplomaProject, Diploma} from './models/diploma.model'

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {
  constructor(private http: HttpClient) {
  }

  // todo: change urls

  // diplomas$: Observable<Diploma[]> = this.http
  //   .get<Diploma[]>('/pri/project')
  //   .pipe(
  //     retry(3),
  //     catchError(
  //       (err: HttpErrorResponse) => throwError(() => err))
  //   )

  mockedDiplomas: Diploma[] = [
    {
      titleEn: 'Modularity effect 1',
      titlePl: 'Efekt modularny 1',
      description: 'To jest opis pracy..',
      projectId: 1,
      projectName: 'Software engineering',
      chapters: [{
        name: "Rozdział 1",
        description: "To jest opis rozdziału",
        studentIndex: "student1"
      }]
    }
  ]

  diplomas$: Observable<Diploma[]> = of(this.mockedDiplomas)
    .pipe(delay(20))

  updateDiploma(addOrUpdateDiploma: AddOrUpdateDiploma): Observable<AddOrUpdateDiploma> {
    return this.http
      .put<AddOrUpdateDiploma>(`/pri/diplomas`, addOrUpdateDiploma)
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }

  getDiplomaProject(projectId: number): Observable<Diploma | undefined> {
    return of(this.mockedDiplomas[0])
      .pipe(delay(20))
  }

  updateDiplomaProject(addOrUpdateDiplomaProject: AddOrUpdateDiplomaProject): Observable<AddOrUpdateDiplomaProject> {
    return this.http
      .put<AddOrUpdateDiplomaProject>(`/pri/diplomas`, addOrUpdateDiplomaProject)
      .pipe(
        retry(3),
        catchError(
          (err: HttpErrorResponse) => throwError(() => err))
      )
  }
}
