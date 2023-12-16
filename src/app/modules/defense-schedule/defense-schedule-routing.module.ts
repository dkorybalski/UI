import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefenseScheduleComponent } from './defense-schedule.component';

const routes: Routes = [
  { path: '', component: DefenseScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefenseScheduleRoutingModule { }
