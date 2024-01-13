import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GradeService } from "../services/grade.service";
import { EvaluationCards } from "../models/grade.model";
import { HttpResponse } from "@angular/common/http";

export const evaulationCardsResolver: ResolveFn<HttpResponse<EvaluationCards>> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(GradeService).getEvaluationCards(route.paramMap.get('id')!);
};
