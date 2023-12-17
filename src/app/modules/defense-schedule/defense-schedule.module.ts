import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DefenseScheduleComponent } from './defense-schedule.component';
import { DefenseDateRangeSelectionComponent } from './components/defense-date-range-selection/defense-date-range-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DefenseScheduleRoutingModule } from './defense-schedule-routing.module';
import { MatInputModule } from '@angular/material/input';
import { DefenseTimeSlotsSelectionComponent } from './components/defense-time-slots-selection/defense-time-slots-selection.component';
import { DefenseCommitteeSelectionComponent } from './components/defense-committee-selection/defense-committee-selection.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { DefenseCommitteeStatisticsComponent } from './components/defense-committee-statistics/defense-committee-statistics.component';
import { DefenseScheduleSelectionComponent } from './components/defense-schedule-selection/defense-schedule-selection.component';
import { MatRadioModule } from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    DefenseScheduleComponent,
    DefenseDateRangeSelectionComponent,
    DefenseTimeSlotsSelectionComponent,
    DefenseCommitteeSelectionComponent,
    DefenseCommitteeStatisticsComponent,
    DefenseScheduleSelectionComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTableModule,
    MatExpansionModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    DefenseScheduleRoutingModule,
    MatInputModule
  ]
})
export class DefenseScheduleModule { }
