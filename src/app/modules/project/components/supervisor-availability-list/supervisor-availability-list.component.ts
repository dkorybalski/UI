import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SupervisorAvailability } from '../../models/supervisor-availability.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { Subject, takeUntil } from 'rxjs';
import { getSupervisorAvailability } from '../../state/project.selectors';
import { loadSupervisorAvailability } from '../../state/project.actions';

@Component({
  selector: 'supervisor-availability-list',
  templateUrl: './supervisor-availability-list.component.html',
  styleUrls: ['./supervisor-availability-list.component.scss']
})
export class SupervisorAvailabilityListComponent implements OnDestroy, OnInit {
  columns: string[] = ['name', 'availability'];
  supervisorAvailability!: MatTableDataSource<SupervisorAvailability>
  unsubscribe$ = new Subject();

  constructor(private store: Store<State>) {}

   ngOnInit(): void {
    this.store.dispatch(loadSupervisorAvailability());

    this.store.select(getSupervisorAvailability).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (supervisorAvailability) => {
        this.supervisorAvailability = new MatTableDataSource<SupervisorAvailability>(supervisorAvailability)
      }
    )
   }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
