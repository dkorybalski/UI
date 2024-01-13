import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { 
    accessTokenRefresh,
    accessTokenRefreshFailure,
    accessTokenRefreshSuccess,
    authenticate,
    authenticateSuccess,
    loadUser,
    loadUserFailure,
    loadUserSuccess 
} from './user.actions';
import { UserService } from '../user.service';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

    loadUserInfo$ = createEffect(() => this.actions$
        .pipe(
            ofType(loadUser),
            mergeMap(() => this.userService.loadUser()
                .pipe(
                    map(user => loadUserSuccess({ user })),
                    catchError(error => of(loadUserFailure({ error })))
                )
            )
        )
    );

    authenticate$ = createEffect(() => this.actions$
        .pipe(
            ofType(authenticate),
            mergeMap((action) => this.userService.authenticate(action.login, action.password)
                .pipe(
                    map(() => authenticateSuccess()),
                    catchError(error => of(loadUserFailure({ error })))
                )
            )
        )
    );

    accessTokenRefresh$ = createEffect(() => this.actions$
        .pipe(
            ofType(accessTokenRefresh),
            mergeMap(() => this.userService.refreshToken()
                .pipe(
                    map(() => accessTokenRefreshSuccess()),
                    catchError(error => of(accessTokenRefreshFailure({ error })))
                )
            )
        )
);
}