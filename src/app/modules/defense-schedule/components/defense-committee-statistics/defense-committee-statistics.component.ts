import { Component, OnDestroy, Input } from '@angular/core';
import { DefenseScheduleService } from '../../defense-schedule.service';
import { Subject } from 'rxjs';
import { SupervisorStatistics } from '../../models/defense-schedule.model';

@Component({
  selector: 'defense-committee-statistics',
  templateUrl: './defense-committee-statistics.component.html',
  styleUrls: ['./defense-committee-statistics.component.scss']
})
export class DefenseCommitteeStatisticsComponent implements OnDestroy {
  unsubscribe$ = new Subject();
  @Input() statistics!: SupervisorStatistics[];
  objectKeys = Object.keys;

  constructor(private defenseScheduleService: DefenseScheduleService){}

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }

}
