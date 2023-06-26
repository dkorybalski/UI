import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProjectService } from "../project.service";
import { SupervisorAvailability } from "../models/supervisor-availability.model";

export const supervisorAvailabilityResolver: ResolveFn<SupervisorAvailability[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ProjectService).supervisorsAvailability$
};