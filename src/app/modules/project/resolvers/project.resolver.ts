import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProjectDetails } from "../models/project";
import { ProjectService } from "../project.service";

export const projectResolver: ResolveFn<ProjectDetails> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ProjectService).getProjectDetails(Number(route.paramMap.get('id')!));
};
