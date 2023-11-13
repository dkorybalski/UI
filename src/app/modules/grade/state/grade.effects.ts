import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GradeService } from '../grade.service';
import { loadGrades, loadGradesFailure, loadGradesSuccess } from './grade.actions';

@Injectable()
export class GradeEffects {

    constructor(
        private actions$: Actions,
        private gradeService: GradeService
    ) { }

    loadGrades$ = createEffect(() => this.actions$
        .pipe(
            ofType(loadGrades),
            mergeMap(() => this.gradeService.grades$
                .pipe(
                    map(grades => loadGradesSuccess({grades})),
                    catchError(error => of(loadGradesFailure({ error })))
                )
            )
        )
    );
}