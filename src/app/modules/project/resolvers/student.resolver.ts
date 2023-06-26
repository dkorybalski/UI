import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProjectService } from "../project.service";
import { Student } from "../../user/models/student.model";

export const studentResolver: ResolveFn<Student[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(ProjectService).students$;
};
