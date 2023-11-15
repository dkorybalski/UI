import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { Supervisor } from 'src/app/modules/user/models/supervisor.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { changeFilters } from '../../state/project.actions';
import { ExternalLinkService } from 'src/app/modules/external-link/external-link.service';
import { getFilters } from '../../state/project.selectors';
import { UserService } from 'src/app/modules/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { isCoordinator, isSupervisor } from 'src/app/modules/user/state/user.selectors';

@Component({
  selector: 'project-filters',
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.scss']
})
export class ProjectFiltersComponent implements OnInit, OnDestroy {
  allColumns: string[] = ['name', 'supervisorName', 'accepted', 'firstSemesterGrade', 'secondSemesterGrade', 'criteriaMetStatus'];
  displayedColumns: string[] = [];
  supervisors$!: Observable<Supervisor[]>
  unsubscribe$ = new Subject()
  @Input() showExternalLinkColumns?: boolean

  searchValue: string = '';
  supervisorIndexNumber!: string | undefined;
  acceptanceStatus!: boolean | undefined;
  criteriaMetStatus: boolean | undefined;
  page: string = 'PROJECT_GROUPS';

  showSupervisorSelect: boolean = false;
  showAcceptanceStatusSelect: boolean = false;
  showCriteriaMetStatusSelect: boolean = false;
  showDisplayedColumnsSelect: boolean = false;

  constructor(
    private userService: UserService, 
    private store: Store<State>,
    private externalLinkService: ExternalLinkService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.queryParamMap,
      this.store.select(isCoordinator),
      this.store.select(isSupervisor),
      this.store.select(getFilters)
    ])
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        ([params, isCoordinator, isSupervisor, filters ]) => {
          if (params.get('page')) {
            this.page = params.get('page')!;
          }

          this.searchValue = filters.searchValue;
          this.supervisorIndexNumber = filters.supervisorIndexNumber;
          this.acceptanceStatus = filters.acceptanceStatus;
          this.displayedColumns = filters.columns;

          this.showSupervisorSelect = isCoordinator || this.page === 'PROJECT_GROUPS';
          this.showAcceptanceStatusSelect = this.page === 'PROJECT_GROUPS';
          this.showCriteriaMetStatusSelect = 
            (this.page === 'GRADES' && (isCoordinator || isSupervisor))  || this.displayedColumns.includes('criteriaMetStatus');
          this.showDisplayedColumnsSelect = this.page === 'PROJECT_GROUPS';
        }
      )

    this.supervisors$ = this.userService.supervisors$;

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
        columnHeaders => this.allColumns = [
            ...this.allColumns,

            ...columnHeaders
          ]
      )
    }
  }

  onFiltersChange(){
    this.store.dispatch(changeFilters({filters: {
      searchValue: this.searchValue,
      supervisorIndexNumber: this.supervisorIndexNumber,
      acceptanceStatus: this.acceptanceStatus,
      columns: this.displayedColumns,
      criteriaMetStatus: this.criteriaMetStatus
    }}))
  }

  resetFilters(){
    this.searchValue = '';
    this.acceptanceStatus = undefined;
    this.supervisorIndexNumber = undefined;
    this.criteriaMetStatus = undefined;
    this.onFiltersChange()
  }

  isAnyFilterActive(): boolean {
    return (
      this.searchValue !== '' || 
      this.supervisorIndexNumber !== undefined || 
      this.acceptanceStatus !== undefined ||
      this.criteriaMetStatus !== undefined
    )
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
