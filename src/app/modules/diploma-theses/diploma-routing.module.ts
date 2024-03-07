import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DiplomaComponent} from './diploma.component'
import {DiplomaDetailsComponent} from './components/diploma-details/diploma-details.component'

const routes: Routes = [
  {
    path: 'details',
    component: DiplomaDetailsComponent
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
