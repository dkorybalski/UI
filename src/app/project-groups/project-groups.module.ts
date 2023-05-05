import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectGroupsRoutingModule } from './project-groups-routing.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProjectGroupsRoutingModule
  ]
})
export class ProjectGroupsModule { }
