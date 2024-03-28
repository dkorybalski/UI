import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DiplomaComponent} from './diploma.component'
import {ProjectDetailsComponent} from "../project/components/project-details/project-details.component";
import {projectResolver} from "../project/resolvers/project.resolver";
import {supervisorAvailabilityResolver} from "../project/resolvers/supervisors-availability.resolver";
import {evaulationCardsResolver} from "../project/resolvers/evaluation-cards.resolver";

const routes: Routes = [
  {
    path: 'projects/details/:id',
    component: ProjectDetailsComponent,
    resolve: {
      projectDetails: projectResolver,
      supervisorAvailability: supervisorAvailabilityResolver,
      evaluationCards: evaulationCardsResolver
    },
  },
  {
    path: '',
    component: DiplomaComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomaRoutingModule {
}
