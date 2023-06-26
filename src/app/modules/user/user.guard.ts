import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { State } from 'src/app/app.state';
import { isLogged } from './state/user.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private store: Store<State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLogged),
            tap(isLogged => {
                !isLogged ? this.router.navigateByUrl(`/login?redirectTo=${state.url}`) : true
            })
        )
    }
}