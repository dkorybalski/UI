import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GradeDetails } from "../models/grade";
import { GradeService } from "../grade.service";

export const gradeDetailsResolver: ResolveFn<GradeDetails> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(GradeService).getGradeDetails(Number(route.paramMap.get('id')!));
};
