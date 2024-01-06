import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefenseScheduleService } from '../../defense-schedule.service';

@Component({
  selector: 'defense-additional-day-form',
  templateUrl: './defense-additional-day-form.component.html',
  styleUrls: ['./defense-additional-day-form.component.scss']
})
export class DefenseAdditonalDayFormComponent {
  form = this.fb.group({
    date: [null, Validators.required],
  })

  constructor(private fb: FormBuilder, private defenseScheduleService: DefenseScheduleService){}

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    let year = date.getFullYear();
    
    let newDateStr = `${day}.${month}.${year}`;
    return newDateStr
  }

  onSubmit(): void {
    if (this.form.valid) {    
      this.defenseScheduleService.additionalDay(this.formatDate(this.form.controls.date.value!)).subscribe(
        () => window.location.reload()
      )
    }
  }
}
