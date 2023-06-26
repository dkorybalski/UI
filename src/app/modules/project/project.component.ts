import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project, ProjectDetails, ProjectWithExternals} from './models/project';
import { ProjectService } from './project.service';
import { EMPTY, Subject, combineLatest, map, takeUntil, tap } from 'rxjs';
import { State } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { loadProjects, loadSupervisorAvailability } from './state/project.actions';
import {  getFilters, getProjects, getSupervisorAvailability } from './state/project.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { SupervisorAvailability } from './models/supervisor-availability.model';
import { SupervisorAvailabilityFormComponent } from './components/supervisor-availability-form/supervisor-availability-form.component';
import { Supervisor } from '../user/models/supervisor.model';
import { Student } from '../user/models/student.model';
import { User } from '../user/models/user.model';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExternalLinkService } from '../external-link/external-link.service';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectListColumns: string[] = ['name', 'supervisorName', 'accepted'];
  supervisors: Supervisor[] = [];
  students: Student[] = [];
  user!: User;
  supervisorListColumns: string[] = ['name', 'availability'];
  supervisorAvailability!: SupervisorAvailability[];
  supervisorAvailabilityDataSource!: MatTableDataSource<SupervisorAvailability>;
  projects!: MatTableDataSource<ProjectWithExternals>;
  projectDetailsForEdit?: ProjectDetails;
  projectButtonText!: string;
  projectId?: number;
  isProjectAdmin?: boolean;
  isCoordinator?: boolean;
  unsubscribe$ = new Subject();
  acceptedProjects: number[] = [];
  assignedProjects: number[] = [];
  externalLinkColumnHeaders: string[] = []
  loading = true;

  constructor(
      public dialog: MatDialog, 
      private projectService: ProjectService, 
      private store: Store<State>,
      private actions$: Actions,
      private _snackbar: MatSnackBar,
      private router: Router,
      private externalLinkService: ExternalLinkService
  ) {}

  ngOnInit(): void {
    this.externalLinkService.columnHeaders$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      columnHeaders => {
        this.externalLinkColumnHeaders = columnHeaders;
      }
    )

    this.observeProjectsState();
    this.checkUserRoleAndAssociatedProject();
    this.observeSupervisorAvailabilityState();
    this.store.dispatch(loadProjects());
    this.store.dispatch(loadSupervisorAvailability());
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

  observeProjectsState(){
    combineLatest([
      this.store.select(getProjects),
      this.store.select(getFilters),
      this.externalLinkService.externalLinkDataList$,
    ]).pipe(
      tap(() => {this.loading = true}),
      takeUntil(this.unsubscribe$)).subscribe(
      ([projects, filters, links]) => {
        if(projects !== undefined){
          let mappedProjects = projects.map((project) => {
            return {
                ...project,
                supervisorName: project.supervisor.name, 
                externalLinks: links.find(linksData => linksData.projectId === project.id)?.externalLinks!
            }
          })

          this.projectListColumns = filters.columns;

          let filteredProjects = mappedProjects.slice().filter(
            project => 
                (project.name.toLowerCase().includes(filters.searchValue.toLowerCase()) ||
                project.supervisor.name.toLowerCase().includes(filters.searchValue.toLowerCase()))
                &&
                ((filters.acceptanceStatus !== undefined 
                    ? project.accepted === filters.acceptanceStatus 
                    : true)
                &&
                (filters.supervisorIndexNumber !== undefined
                    ? project.supervisor.indexNumber === filters.supervisorIndexNumber 
                    : true) )             
          )
          this.projects = new MatTableDataSource<ProjectWithExternals>(filteredProjects);

          this.loading = false;
        }
      }
    )
  }

  observeSupervisorAvailabilityState(){
    this.store.select(getSupervisorAvailability).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (supervisorAvailability) => {
        this.supervisorAvailability = supervisorAvailability;
        this.supervisorAvailabilityDataSource = new MatTableDataSource<SupervisorAvailability>(supervisorAvailability);
      }
    )
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

  getProjectDetailsAndOpenModal(id: string){
    //this.router.navigate ([ { outlets: { modal: `projects/${id}` }}]) 
    this.router.navigate ([`projects/details/${id}`]) 
  }

  get showExternalLinkColumns(){
    return this.user.role === 'COORDINATOR' || this.user.role === 'SUPERVISOR'
  }

  showProjectButton(){
    return (this.user.role === 'STUDENT' && this.user.acceptedProjects.length === 0) || (this.user.role === 'PROJECT_ADMIN')
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
