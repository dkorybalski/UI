import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ExternalLinkService } from 'src/app/modules/external-link/external-link.service';
import { getFilters, getProjects } from '../../state/project.selectors';
import { State } from 'src/app/app.state';
import { Router } from '@angular/router';
import { changeFilters, loadProjects } from '../../state/project.actions';
import { Project } from '../../models/project';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnDestroy, OnInit{
  @Input() acceptedProjects!: number[];
  @Input() assignedProjects!: number[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columns = ['name', 'supervisorName', 'accepted'];
  projects!: MatTableDataSource<Project>;
  externalLinkColumnHeaders: string[] = [];
  unsubscribe$ = new Subject();
  loading = true;

  constructor(
    private store: Store<State>,
    private externalLinkService: ExternalLinkService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProjects());

    combineLatest([
      this.store.select(getProjects),
      this.store.select(getFilters),
      this.externalLinkService.externalLinkDataList$,
    ]).pipe(
      tap(() => this.loading = true),
      takeUntil(this.unsubscribe$)).subscribe(
      ([projects, filters, links]) => {
        if(projects !== undefined){
          const mappedProjects = projects.map((project) => {
            return {
                ...project,
                supervisorName: project.supervisor.name, 
                externalLinks: links.find(linksData => linksData.projectId === project.id)?.externalLinks!
            }
          })

          this.columns = filters.columns;

          const filteredProjects = mappedProjects.slice().filter(
            project => 
                this.filterProjectBySearchValue(project, filters.searchValue) && 
                (
                  this.filterProjectByAcceptanceStatus(project, filters.acceptanceStatus) &&
                  this.filterProjectBySupervisorIndexNumber(project, filters.supervisorIndexNumber)
                )             
          )
          this.projects = new MatTableDataSource<Project>(filteredProjects);
          this.projects.paginator = this.paginator;
          this.projects.sort = this.sort;

          this.loading = false;
        }
      }
    )

    this.externalLinkService.columnHeaders$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      columnHeaders => {
        this.externalLinkColumnHeaders = columnHeaders;
      }
    )
  }

  filterProjectBySearchValue(project: Project, searchValue: string): boolean {
    return project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
           project.supervisor.name.toLowerCase().includes(searchValue.toLowerCase())
  }

  filterProjectByAcceptanceStatus(project: Project, acceptanceStatus?: boolean): boolean {
    return acceptanceStatus !== undefined ? project.accepted === acceptanceStatus : true
  }

  filterProjectBySupervisorIndexNumber(project: Project, supervisorIndexNumber?: string): boolean {
    return supervisorIndexNumber !== undefined ? project.supervisor.indexNumber === supervisorIndexNumber : true
  }


  isProjectAccepted(id: number){
    return this.acceptedProjects.findIndex(projectId => projectId === id) !== -1
  }

  isProjectAssigned(id: number){
    return this.acceptedProjects.findIndex(projectId => projectId === id) === -1 && 
           this.assignedProjects.findIndex(projectId => projectId === id) !== -1 
  }

  navigateToProjectDetails(projectId: string){
    this.router.navigate([{outlets: {modal: `projects/details/${projectId}`}}]) 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()

    this.store.dispatch(changeFilters({filters: {
      searchValue: '',
      supervisorIndexNumber: undefined,
      acceptanceStatus: undefined,
      columns: ['name', 'supervisorName', 'accepted']
    }}))
  }
}
