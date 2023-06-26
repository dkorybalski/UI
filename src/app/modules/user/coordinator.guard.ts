import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/app.state';
import { isCoordinator } from './state/user.selectors';

@Injectable({
    providedIn: 'root'
})
export class CoordinatorGuard implements CanActivate {
    constructor(private store: Store<State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isCoordinator),
            tap(isCoordinator => !isCoordinator ? this.router.navigateByUrl('/login') : true)
        )
    }
}