import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Student } from "../../user/models/student.model";
import { UserService } from "../user.service";

export const studentResolver: ResolveFn<Student[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(UserService).students$;
};
