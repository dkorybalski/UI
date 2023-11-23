import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GradeService } from "../services/grade.service";
import { EvaluationCards } from "../models/grade.model";

export const evaulationCardsResolver: ResolveFn<EvaluationCards> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(GradeService).getEvaluationCards(Number(route.paramMap.get('id')!));
};
