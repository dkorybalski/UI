import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Supervisor } from 'src/app/modules/user/models/supervisor.model';
import { ProjectService } from '../../project.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { changeFilters } from '../../state/project.actions';
import { ExternalLinkService } from 'src/app/modules/external-link/external-link.service';
import { getFilters } from '../../state/project.selectors';

@Component({
  selector: 'project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss']
})
export class ProjectFiltersComponent implements OnInit, OnDestroy {
  allColumns: string[] = ['name', 'supervisorName'];
  displayedColumns: string[] = [];
  supervisors$!: Observable<Supervisor[]>
  unsubscribe$ = new Subject()
  @Input() showExternalLinkColumns?: boolean

  searchValue: string = '';
  supervisorIndexNumber!: string | undefined;
  acceptanceStatus!: boolean | undefined;

  constructor(
    private projectService: ProjectService, 
    private store: Store<State>,
    private externalLinkService: ExternalLinkService
  ){}

  ngOnInit(): void {
    this.supervisors$ = this.projectService.supervisors$;

    this.store.select(getFilters).pipe(takeUntil(this.unsubscribe$)).subscribe(
      filters => {
        this.searchValue = filters.searchValue;
        this.supervisorIndexNumber = filters.supervisorIndexNumber;
        this.acceptanceStatus = filters.acceptanceStatus;
        this.displayedColumns = filters.columns;
      }
    )

    if(this.showExternalLinkColumns){
      this.externalLinkService.columnHeaders$.pipe(takeUntil(this.unsubscribe$)).subscribe(
        columnHeaders => this.allColumns = [...this.allColumns, ...columnHeaders, 'accepted']
      )
    } else {
      this.allColumns = [...this.allColumns, 'accepted']
    }
  }

  onFiltersChange(){
    this.store.dispatch(changeFilters({filters: {
      searchValue: this.searchValue,
      supervisorIndexNumber: this.supervisorIndexNumber,
      acceptanceStatus: this.acceptanceStatus,
      columns: this.displayedColumns
    }}))
  }

  resetFilters(){
    this.searchValue = '';
    this.acceptanceStatus = undefined;
    this.supervisorIndexNumber = undefined;
    this.onFiltersChange()
  }

  isAnyFilterActive(): boolean {
    return (this.searchValue !== '' || this.supervisorIndexNumber !== undefined || this.acceptanceStatus !== undefined)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
