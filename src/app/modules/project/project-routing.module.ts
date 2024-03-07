import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProjectComponent} from './project.component'
import {ProjectDetailsComponent} from './components/project-details/project-details.component'
import {projectResolver} from './resolvers/project.resolver'
import {supervisorAvailabilityResolver} from './resolvers/supervisors-availability.resolver'
import {ProjectFormComponent} from './components/project-form/project-form.component'
import {userResolver} from '../user/resolvers/user.resolver'
import {
  SupervisorAvailabilityFormComponent
} from './components/supervisor-availability-form/supervisor-availability-form.component'
import {evaulationCardsResolver} from './resolvers/evaluation-cards.resolver'
import {studentResolver} from '../user/resolvers/student.resolver'
import {supervisorResolver} from '../user/resolvers/supervisor.resolver'
import {DiplomaFormComponent} from '../diploma-theses/components/diploma-form/diploma-form.component'

const routes: Routes = [
  {
    path: 'form',
    component: ProjectFormComponent,
    resolve: {
      user: userResolver,
      students: studentResolver,
      supervisors: supervisorResolver
    },
  },
  {
    path: 'form/:id',
    component: ProjectFormComponent,
    resolve: {
      projectDetails: projectResolver,
      user: userResolver,
      students: studentResolver,
      supervisors: supervisorResolver
    },
  },
  {
    path: 'diploma/form',
    component: DiplomaFormComponent
  },
  {
    path: 'availability',
    component: SupervisorAvailabilityFormComponent,
    resolve: {
      availabilities: supervisorAvailabilityResolver
    },
  },
  {
    path: 'details/:id',
    component: ProjectDetailsComponent,
    resolve: {
      projectDetails: projectResolver,
      supervisorAvailability: supervisorAvailabilityResolver,
      evaluationCards: evaulationCardsResolver
    },
  },
  {
    path: '',
    component: ProjectComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
