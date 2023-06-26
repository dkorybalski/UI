import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project, ProjectWithExternals } from '../../models/project';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent{
  @Input() columns!: string[];
  @Input() externalLinkColumnHeaders: string[] = [];
  @Input() acceptedProjects!: number[];
  @Input() assignedProjects!: number[];
  @Input() projects!: MatTableDataSource<ProjectWithExternals>;
  @Output() openProjectDetailsEvent = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    this.projects.paginator = this.paginator;
    this.projects.sort = this.sort;
  }

  isProjectAccepted(id: number){
    return this.acceptedProjects.findIndex(projectId => projectId === id) !== -1
  }

  isProjectAssigned(id: number){
    return this.acceptedProjects.findIndex(projectId => projectId === id) === -1 && 
           this.assignedProjects.findIndex(projectId => projectId === id) !== -1 
  }
}
