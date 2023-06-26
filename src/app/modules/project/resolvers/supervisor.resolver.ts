import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProjectService } from "../project.service";
import { Supervisor } from "../../user/models/supervisor.model";

export const supervisorResolver: ResolveFn<Supervisor[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ProjectService).supervisors$;
};
