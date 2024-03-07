import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of} from 'rxjs'
import {catchError, map, mergeMap} from 'rxjs/operators'
import {
  loadDiplomas,
  loadDiplomasFailure,
  loadDiplomasSuccess,
  updateDiploma,
  updateDiplomaFailure,
  updateDiplomaSuccess
} from './diploma.actions'
import {DiplomaService} from '../diploma.service'

@Injectable()
export class DiplomaEffects {

  constructor(
    private actions$: Actions,
    private diplomaService: DiplomaService
  ) {
  }

  loadDiplomas$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadDiplomas),
      mergeMap(() => this.diplomaService.diplomas$
        .pipe(
          map(diplomas => loadDiplomasSuccess({diplomas})),
          catchError(error => of(loadDiplomasFailure({error})))
        )
      )
    )
  )

  updateDiploma$ = createEffect(() => this.actions$
    .pipe(
      ofType(updateDiploma),
      mergeMap((action) => this.diplomaService.updateDiploma(action.addOrUpdateDiploma)
        .pipe(
          map(() => updateDiplomaSuccess({addOrUpdateDiploma: action.addOrUpdateDiploma})),
          catchError(error => of(updateDiplomaFailure({error})))
        )
      )
    )
  )
}
