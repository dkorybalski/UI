import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {combineLatest, Subject, takeUntil, tap} from 'rxjs'
import {Store} from '@ngrx/store'
import {getDiplomas} from '../../state/diploma.selectors'
import {State} from 'src/app/app.state'
import {loadDiplomas} from '../../state/diploma.actions'
import {Diploma, DiplomaWithProject} from '../../models/diploma.model'
import {Router} from '@angular/router'
import {getProjects} from "../../../project/state/project.selectors";
import {loadProjects} from "../../../project/state/project.actions";
import {Project} from "../../../project/models/project.model";

@Component({
  selector: 'diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.scss']
})

export class DiplomaListComponent implements OnDestroy, OnInit {
  @Input() acceptedProjects!: string[]
  @Input() assignedProjects!: string[]
  @Input() page!: string
  @Input() externalLinkColumnHeaders!: string[]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  columns = ['titleEn', 'projectName', 'studentName']
  diplomas!: MatTableDataSource<DiplomaWithProject>
  unsubscribe$ = new Subject()
  loading = true

  constructor(
    private store: Store<State>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadDiplomas())
    this.store.dispatch(loadProjects())
    combineLatest([
      this.store.select(getDiplomas),
      this.store.select(getProjects)
    ]).pipe(
      tap(() => this.loading = true),
      takeUntil(this.unsubscribe$)).subscribe(
      ([diplomas, projects]) => {
        if (diplomas !== undefined && projects !== undefined) {
          this.diplomas = new MatTableDataSource<DiplomaWithProject>(this.merge(diplomas, projects))
          this.diplomas.paginator = this.paginator
        }
      }
    )
  }

  navigateToProjectDetails(diploma: DiplomaWithProject) {
    console.log(diploma)
    this.router.navigate([{outlets: {modal: `diploma-theses/projects/details/` + diploma.diploma.projectId}}],
      {
        state: {diploma: diploma}
      })
  }

  ngOnDestroy(): void {

  }

  private merge(diplomas: Diploma[], projects: Project[]): DiplomaWithProject[] {
    const diplomaWithProjects: DiplomaWithProject[] = [];

    diplomas.forEach(diploma => {
      const project = projects.find(proj => parseInt(proj.id!) === diploma.projectId);
      if (project) {
        const studentsCount = project.students!.split(',').length
        const studentDiplomasCount = diploma.chapters.length
        diplomaWithProjects.push({diploma, project, studentDiplomasCount, studentsCount});
      }
    });

    return diplomaWithProjects;
  }
}
