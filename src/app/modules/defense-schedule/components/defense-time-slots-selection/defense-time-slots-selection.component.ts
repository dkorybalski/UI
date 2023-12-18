import { Component, Input, OnInit } from '@angular/core';
import { DefenseScheduleService } from '../../defense-schedule.service';
import { SupervisorAvailabilitySurvey, SupervisorDefenseAssignment } from '../../models/defense-schedule.model';
import { Subject, takeUntil} from 'rxjs';
import { User } from 'src/app/modules/user/models/user.model';

interface DateTimeReference {
  date: string,
  time: string
}

@Component({
  selector: 'defense-time-slots-selection',
  templateUrl: './defense-time-slots-selection.component.html',
  styleUrls: ['./defense-time-slots-selection.component.scss']
})
export class DefenseTimeSlotsSelectionComponent implements OnInit {
  dates: string[] = [];
  times: string[] = [];
  hoveredSlots: {[key: string]: {[key: string]: boolean}} = {};
  supervisorAvailabilitySurvey!: SupervisorAvailabilitySurvey;
  startStatus!: boolean;
  start: DateTimeReference = { date: '', time: '' }
  end: DateTimeReference = { date: '', time: '' }
  over: DateTimeReference = { date: '', time: '' }
  unsubscribe$ = new Subject();
  lastSelectedSlots: SupervisorAvailabilitySurvey = {};
  selectedSlots!: SupervisorAvailabilitySurvey;
  @Input() user!: User;


  constructor(private defenseScheduleService: DefenseScheduleService){}

  ngOnInit(): void {

    this.defenseScheduleService.getSupervisorAvailabilitySurvey().pipe(takeUntil(this.unsubscribe$)).subscribe(
      survey => {
        this.selectedSlots = survey
        

        for(let date of Object.keys(this.selectedSlots)){
          this.hoveredSlots[date] = {};
          this.lastSelectedSlots[date] = {};
          this.dates.push(date);

          for(let time of Object.keys(this.selectedSlots[date])){
            if(this.times.indexOf(time) === -1){
              this.times.push(time);
            }
            this.hoveredSlots[date][time] = false;
          }
        }
      }
    )
  }

  updateAssignment(slots: {[key: string]: SupervisorDefenseAssignment}){
    this.defenseScheduleService.updateSupervisorDefenseAssignment(slots).pipe(takeUntil(this.unsubscribe$)).subscribe()
  }


  onMouseDown(date: string, time: string){
    this.hoveredSlots[date][time] = true;
    this.start = {date, time}
    this.startStatus = this.selectedSlots[this.start.date][this.start.time].available
  }

  onMouseEnter(date: string, time: string){
    if(this.start.date === date){
      if(this.start.time !== time){
        this.hoveredSlots[date][time] = true;
      }
      this.over = {date, time};
  
      const startIndex = this.times.indexOf(this.start.time);
      const overIndex = this.times.indexOf(this.over.time);
  
      for(let t of Object.keys(this.hoveredSlots[date])){
        const timeIndex = this.times.indexOf(t);
  
        if(this.start.date === date && 
          (timeIndex > startIndex && timeIndex > overIndex)){
          this.hoveredSlots[date][t] = false;
        }
      }
  
    } else {
      this.start = { date: '', time: '' };
      this.end = { date: '', time: '' };
      this.dates.forEach(date => {
        this.hoveredSlots[date] = {};
  
        this.times.forEach(time => {
          this.hoveredSlots[date][time] = false;
        })
      });
    }

    
  }

  onMouseUp(date: string, time: string){
    this.end = {date, time};
    const startIndex = this.times.indexOf(this.start.time);
    const endIndex = this.times.indexOf(this.end.time);

    if(this.end.date === this.start.date){
      if(startIndex === endIndex){
        this.selectedSlots[date][time].available = !this.selectedSlots[date][time].available; 
        this.lastSelectedSlots[date][time] = JSON.parse(JSON.stringify(this.selectedSlots[date][time]))
      } else {
        for(let t of Object.keys(this.selectedSlots[date])){
          const timeIndex = this.times.indexOf(t);

          if(startIndex < endIndex){
            if((timeIndex >= startIndex && timeIndex <= endIndex)){
              this.selectedSlots[date][t].available = !this.startStatus;
              this.lastSelectedSlots[date][t] = JSON.parse(JSON.stringify(this.selectedSlots[date][t]))
            }
          } else {
            if((timeIndex <= startIndex && timeIndex >= endIndex)){
              this.selectedSlots[date][t].available = !this.startStatus;
              this.lastSelectedSlots[date][t] = JSON.parse(JSON.stringify(this.selectedSlots[date][t]))
            }
          }
        }
      }
      this.updateAssignment(this.lastSelectedSlots[date])
    }


    this.dates.forEach(date => {
      this.hoveredSlots[date] = {};
      this.lastSelectedSlots[date] = {};

      this.times.forEach(time => {
        this.hoveredSlots[date][time] = false;
      })
    });

    this.start = { date: '', time: '' };
    this.end = { date: '', time: '' };

    
    console.log(this.selectedSlots)

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }



}
