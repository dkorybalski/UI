import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GradeDetails } from "../models/grade.model";
import { GradeService } from "../services/grade.service";

export const gradeDetailsResolver: ResolveFn<GradeDetails> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(GradeService).getGradeDetails(Number(route.paramMap.get('id')!));
};
