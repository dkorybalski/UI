import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProjectService } from "../project.service";
import { ProjectDetails } from "../models/project.model";

export const projectResolver: ResolveFn<ProjectDetails> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ProjectService).getProjectDetails(route.paramMap.get('id')!);
};
