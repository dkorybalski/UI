import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {combineLatest, Subject, takeUntil, tap} from 'rxjs'
import {Store} from '@ngrx/store'
import {getDiplomas} from '../../state/diploma.selectors'
import {State} from 'src/app/app.state'
import {loadDiplomas} from '../../state/diploma.actions'
import {Diploma} from '../../models/diploma.model'
import {Router} from '@angular/router'

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
  diplomas!: MatTableDataSource<Diploma>
  unsubscribe$ = new Subject()
  loading = true

  constructor(
    private store: Store<State>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadDiplomas())
    combineLatest([
      this.store.select(getDiplomas),
    ]).pipe(
      tap(() => this.loading = true),
      takeUntil(this.unsubscribe$)).subscribe(
      ([diplomas]) => {
        if (diplomas !== undefined) {
          console.log(diplomas)
          this.diplomas = new MatTableDataSource<Diploma>(diplomas)
          this.diplomas.paginator = this.paginator
        }
      }
    )
  }

  navigateToDetails(diploma: Diploma) {
    this.router.navigate([{outlets: {modal: `diploma-theses/details`}}],
      {
        state: {diploma: diploma}
      })
  }

  ngOnDestroy(): void {

  }
}
