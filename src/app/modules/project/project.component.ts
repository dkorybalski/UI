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
import { AreYouSureDialogComponent } from '../shared/are-you-sure-dialog/are-you-sure-dialog.component';

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
  projectId?: string;
  isProjectAdmin?: boolean;
  isCoordinator?: boolean;
  acceptedProjects: string[] = [];
  assignedProjects: string[] = [];
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
              this.projectButtonText = 'Add project';
              break;
          }

          if (params.get('page')) {
            this.page = params.get('page')!;
          }

          this.displayedColumns = [
            'name',
            'supervisorName',
            'accepted',
            'firstSemesterGrade',
            'secondSemesterGrade',
            'criteriaMetStatus',
            'defenseDay',
            'evaluationPhase',
            'classroom',
          ];
          //this.displayedColumns.push(...externalLinkColumnHeaders)
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

  openAreYouSureDialog(action: string): void {
    const actionMap: {[key: string]: { name: string, action: Function}} = {
      'publish': {
        name: 'publish all projects, evaluation cards will be available for students to view.',
        action: this.publishAllProjects.bind(this),
      },
      'activateSecondSemester': {
        name: 'activate the evaluation card for the second semester, the entire evaluation process will start from the beginning for the second semester.',
        action: this.activateSecondSemester.bind(this),
      }
    }

    const dialogRef = this.dialog.open(AreYouSureDialogComponent, {
      data: { actionName: actionMap[action].name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        actionMap[action].action()
      }
    });
  }

  openSupervisorAvailabilityForm(): void {
    if(this.isCoordinator){
      this.router.navigate([{outlets: {modal: `projects/availability`}}]) 
    }
  }

  publishAllProjects(): void{
    this.projectService.publishAllProjects().pipe(takeUntil(this.unsubscribe$)).subscribe(
      () => window.location.reload()
    )
  }

  activateSecondSemester(): void{
    this.projectService.activateSecondSemester().pipe(takeUntil(this.unsubscribe$)).subscribe(
      () => window.location.reload()
    )
  }

  get showEditOrAddProjectButton(){
    return (this.user.role === 'STUDENT' && this.user.acceptedProjects.length === 0) || (this.user.role === 'PROJECT_ADMIN') || (this.user.role === 'COORDINATOR') 
  }

  get showExternalLinkColumns(){
    return this.user.role === 'COORDINATOR' || this.user.role === 'SUPERVISOR'
  }

  get showPublishAllButton(){
    return this.user.role === 'COORDINATOR'
  }

  get showActivateSecondSemesterButton(){
    return this.user.role === 'COORDINATOR'
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
