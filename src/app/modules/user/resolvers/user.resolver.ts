import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { UserState } from "../state/user.state";
import { Store } from "@ngrx/store";
import { getUser } from "../state/user.selectors";


export const userResolver: ResolveFn<UserState> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(Store).select(getUser!);
};