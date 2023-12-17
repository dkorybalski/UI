import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DefenseScheduleService } from './defense-schedule.service';
import { SupervisorDefenseAssignmentAggregated, SupervisorStatistics, ChairpersonAssignmentAggregated, ProjectDefense } from './models/defense-schedule.model';
import { Subject, takeUntil } from 'rxjs';
import { State } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { User } from '../user/models/user.model';

@Component({
  selector: 'defense-schedule',
  templateUrl: './defense-schedule.component.html',
  styleUrls: ['./defense-schedule.component.scss']
})
export class DefenseScheduleComponent implements OnInit, OnDestroy {

  defenseAssignments!: SupervisorDefenseAssignmentAggregated;
  chairpersonAssignments!: ChairpersonAssignmentAggregated;
  unsubscribe$ = new Subject();
  statistics: SupervisorStatistics[] = [];
  user!: User;
  defenses!: ProjectDefense[];

  constructor(private defenseScheduleService: DefenseScheduleService, private store: Store<State>){}

  ngOnInit(): void {
    this.defenseScheduleService.getSupervisorsDefenseAssignment().pipe(takeUntil(this.unsubscribe$)).subscribe(
      assignments => this.defenseAssignments = assignments
    )

    this.defenseScheduleService.getSupervisorsStatistics().pipe(takeUntil(this.unsubscribe$)).subscribe(
      statistics => this.statistics = statistics
    )

    this.defenseScheduleService.getChairpersonAssignmentAggregated().pipe(takeUntil(this.unsubscribe$)).subscribe(
      assignments => this.chairpersonAssignments = assignments
    )

    this.defenseScheduleService.getProjectDefenses().subscribe(
      defenses =>  this.defenses = defenses
    )

    this.store.select('user').subscribe(user => {
      this.user = user;
    });
  }

  onStatisticsUpdated(statistics: SupervisorStatistics[]){
    this.statistics = statistics;
  }

  get showDefenseScheduleConfig(): boolean {
    return this.user?.role === 'COORDINATOR' && this.defenseAssignments === null;
  }

  get showSupervisorAccessibilitySurvey(): boolean {
    return this.user?.role === 'SUPERVISOR';
  }

  get showCommitteeSelectionSurvey(): boolean {
    return this.user?.role === 'COORDINATOR' && this.defenseAssignments !== null;
  }

  get showDefensesList(): boolean {
    return this.user?.role === 'STUDENT' || this.user?.role === 'PROJECT_ADMIN';
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }

}
