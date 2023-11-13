import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Supervisor } from "../../user/models/supervisor.model";
import { UserService } from "../../user/user.service";

export const supervisorResolver: ResolveFn<Supervisor[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(UserService).supervisors$;
};
