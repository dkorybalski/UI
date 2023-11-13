import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Supervisor } from 'src/app/modules/user/models/supervisor.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { changeFilters } from '../../state/grade.actions';
import { getFilters } from '../../state/grade.selectors';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'grade-filters',
  templateUrl: './grade-filters.component.html',
  styleUrls: ['./grade-filters.component.scss']
})
export class GradeFiltersComponent implements OnInit, OnDestroy {
  supervisors$!: Observable<Supervisor[]>
  unsubscribe$ = new Subject()

  searchValue: string = '';
  supervisorIndexNumber!: string | undefined;
  criteriaMetStatus!: boolean | undefined;
  semester: 'FIRST' | 'SECOND' = 'FIRST';

  constructor(
    private userService: UserService, 
    private store: Store<State>,
  ){}

  ngOnInit(): void {
    this.supervisors$ = this.userService.supervisors$;

    this.store.select(getFilters).pipe(takeUntil(this.unsubscribe$)).subscribe(
      filters => {
        this.searchValue = filters.searchValue;
        this.semester = filters.semester
        this.supervisorIndexNumber = filters.supervisorIndexNumber;
        this.criteriaMetStatus = filters.criteriaMetStatus;
      }
    )
  }

  onFiltersChange(){
    this.store.dispatch(changeFilters({filters: {
      searchValue: this.searchValue,
      supervisorIndexNumber: this.supervisorIndexNumber,
      semester: this.semester,
      criteriaMetStatus: this.criteriaMetStatus
    }}))
  }

  resetFilters(){
    this.searchValue = '';
    this.criteriaMetStatus = undefined;
    this.supervisorIndexNumber = undefined;
    this.onFiltersChange()
  }

  isAnyFilterActive(): boolean {
    return (this.searchValue !== '' || this.supervisorIndexNumber !== undefined || this.criteriaMetStatus !== undefined)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
