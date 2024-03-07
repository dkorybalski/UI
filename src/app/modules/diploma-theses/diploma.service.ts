import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, delay, Observable, of, retry, throwError} from 'rxjs'
import {AddOrUpdateDiploma, Diploma} from './models/diploma.model'

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
      chapters: 'Rozdział 1. Test\nRozdział 2. Test',
      studentIndex: 'string',
      studentName: 'Adam Nowak',
      projectId: 21,
      projectName: 'Software engineering'
    },
    {
      titleEn: 'Modularity effect 2',
      titlePl: 'Efekt modularny 2',
      description: 'To jest opis pracy..',
      chapters: 'Rozdział 1. Test\nRozdział 2. Test',
      studentIndex: 'mw',
      studentName: 'Jan Nowak',
      projectId: 21,
      projectName: 'Network engineering'
    },
    {
      titleEn: 'Modularity effect 3',
      titlePl: 'Efekt modularny 3',
      description: 'To jest opis pracy..',
      chapters: 'Rozdział 1. Test\nRozdział 2. Test',
      studentIndex: 'string',
      studentName: 'Henryk Nowak',
      projectId: 21,
      projectName: 'Software engineering'
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

  getDiplomasForProject(projectId: number): Observable<Diploma[]> {
    return of(this.mockedDiplomas)
      .pipe(delay(20))
  }
}
