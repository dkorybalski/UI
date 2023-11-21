import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from './project.service';
import { EMPTY, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { State } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Supervisor } from '../user/models/supervisor.model';
import { Student } from '../user/models/student.model';
import { User } from '../user/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { updateDisplayedColumns } from './state/project.actions';
import { getNumberOfColumns } from './state/project.selectors';
import { ExternalLinkService } from './services/external-link.service';
import { ProjectDetails } from './models/project.model';

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
  projectId?: number
  isProjectAdmin?: boolean;
  isCoordinator?: boolean;
  acceptedProjects: number[] = [];
  assignedProjects: number[] = [];
  unsubscribe$ = new Subject();
  page: string = 'PROJECT_GROUPS';
  externalLinkColumnHeaders: string[] = [];
  displayedColumns: string[] = [];
  mainTableFullWidth = false;

  constructor(
      public dialog: MatDialog, 
      private projectService: ProjectService, 
      private userService: UserService, 
      private store: Store<State>,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private externalLinkService: ExternalLinkService
  ) {}

  ngOnInit(): void {
    this.checkUserRoleAndAssociatedProject();
    this.projectService.students$.pipe(takeUntil(this.unsubscribe$)).subscribe(students => this.students = students)
    this.userService.supervisors$.pipe(takeUntil(this.unsubscribe$)).subscribe(supervisors => this.supervisors = supervisors)

    this.store.select(getNumberOfColumns).pipe(takeUntil(this.unsubscribe$)).subscribe(
      number => this.mainTableFullWidth = number > 3
    )

    combineLatest([
      this.activatedRoute.queryParamMap,
      this.store.select('user'),
      this.externalLinkService.columnHeaders$
    ])
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        ([params, user, externalLinkColumnHeaders]) => {
          this.externalLinkColumnHeaders = externalLinkColumnHeaders;

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

          if (params.get('page')) {
            this.page = params.get('page')!;
          }

          this.displayedColumns = ['name'];
          if(this.isCoordinator){
            this.displayedColumns.push('supervisorName')
          }

          switch(this.page){
            case 'PROJECT_GROUPS':
              this.displayedColumns.push('accepted')
            break;
            case 'GRADES':
              this.displayedColumns.push('firstSemesterGrade','secondSemesterGrade','criteriaMetStatus'); 
            break;
            case 'EXTERNAL_LINKS':
              this.displayedColumns.push(...externalLinkColumnHeaders)
            break;
          }

          this.store.dispatch(updateDisplayedColumns({columns: this.displayedColumns}));
        }
      )
  
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
      this.router.navigate([{outlets: {modal: `projects/form/${this.projectId}`}}]);
    } else {
      this.router.navigate([{outlets: {modal: `projects/form`}}]);
    }
  }

  openSupervisorAvailabilityForm(): void {
    if(this.isCoordinator){
      this.router.navigate([{outlets: {modal: `projects/availability`}}]) 
    }
  }

  get showEditOrAddProjectButton(){
    return (this.user.role === 'STUDENT' && this.user.acceptedProjects.length === 0) || (this.user.role === 'PROJECT_ADMIN')
  }

  get showExternalLinkColumns(){
    return this.user.role === 'COORDINATOR' || this.user.role === 'SUPERVISOR'
  }

  get pageTitle(): string {
    const titles: { [key: string]: string } = {
      'PROJECT_GROUPS': 'Project groups',
      'EXTERNAL_LINKS': 'External Links',
      'GRADES': 'Grades'
    }

    return titles[this.page];
  }

  get isProjectGroupsPage(): boolean {
    return this.page === 'PROJECT_GROUPS';
  }

  get isMainTableFullWidth(): boolean {
    return this.displayedColumns.length > 3
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
