import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProjectWithExternals } from '../../models/project';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProjectService } from '../../project.service';
import { ExternalLinkService } from 'src/app/modules/external-link/external-link.service';
import { getFilters, getProjects } from '../../state/project.selectors';
import { State } from 'src/app/app.state';
import { Router } from '@angular/router';
import { loadProjects } from '../../state/project.actions';

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
  projects!: MatTableDataSource<ProjectWithExternals>;
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
          this.projects = new MatTableDataSource<ProjectWithExternals>(filteredProjects);
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

  filterProjectBySearchValue(project: ProjectWithExternals, searchValue: string): boolean {
    return project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
           project.supervisor.name.toLowerCase().includes(searchValue.toLowerCase())
  }

  filterProjectByAcceptanceStatus(project: ProjectWithExternals, acceptanceStatus?: boolean): boolean {
    return acceptanceStatus !== undefined ? project.accepted === acceptanceStatus : true
  }

  filterProjectBySupervisorIndexNumber(project: ProjectWithExternals, supervisorIndexNumber?: string): boolean {
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
    this.router.navigate ([`projects/details/${projectId}`]) 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
