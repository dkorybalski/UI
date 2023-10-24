import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetails } from './models/project';
import { ProjectService } from './project.service';
import { EMPTY, Subject, map, takeUntil } from 'rxjs';
import { State } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Supervisor } from '../user/models/supervisor.model';
import { Student } from '../user/models/student.model';
import { User } from '../user/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  supervisors: Supervisor[] = [];
  students: Student[] = [];
  user!: User;
  projectDetailsForEdit?: ProjectDetails;
  projectButtonText!: string;
  projectId?: number;
  isProjectAdmin?: boolean;
  isCoordinator?: boolean;
  acceptedProjects: number[] = [];
  assignedProjects: number[] = [];
  unsubscribe$ = new Subject();

  // TODO make event from project list when columns will have more position then 3 change it projectListColumns.length >= 3
  tableFullWidth = false;

  constructor(
      public dialog: MatDialog, 
      private projectService: ProjectService, 
      private store: Store<State>,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkUserRoleAndAssociatedProject();
    this.projectService.students$.pipe(takeUntil(this.unsubscribe$)).subscribe(students => this.students = students)
    this.projectService.supervisors$.pipe(takeUntil(this.unsubscribe$)).subscribe(supervisors => this.supervisors = supervisors)
  }

  checkUserRoleAndAssociatedProject(): void{
    this.store.select('user').pipe(
      takeUntil(this.unsubscribe$),
      map(user => {
        this.user = user;
        this.acceptedProjects = user.acceptedProjects;
        this.assignedProjects = user.projects;
        switch(user.role){
          case 'PROJECT_ADMIN':
            this.isProjectAdmin = true;
            this.projectButtonText = 'Edit project';
            this.projectId = user.acceptedProjects[0];
            break;
          case 'STUDENT': 
            this.projectButtonText = 'Add project';
            break;
          case 'COORDINATOR': 
            this.isCoordinator = true;
            break;
        }
        return EMPTY
      })
    ).subscribe()
  }

  openProjectForm(): void {
    if(this.isProjectAdmin){
      this.router.navigate ([`projects/form/${this.projectId}`]) 
    } else {
      this.router.navigate ([`projects/form`]) 
    }
  }

  openSupervisorAvailabilityForm(): void {
    if(this.isCoordinator){
      this.router.navigate ([`projects/availability`]) 
    }
  }

  get showEditOrAddProjectButton(){
    return (this.user.role === 'STUDENT' && this.user.acceptedProjects.length === 0) || (this.user.role === 'PROJECT_ADMIN')
  }

  get showExternalLinkColumns(){
    return this.user.role === 'COORDINATOR' || this.user.role === 'SUPERVISOR'
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
