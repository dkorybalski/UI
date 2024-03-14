import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {StoreModule} from '@ngrx/store';
import {projectReducer} from './state/project.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from './state/project.effects';
import {ProjectComponent} from './project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {ProjectFormComponent} from './components/project-form/project-form.component';
import {ProjectFiltersComponent} from './components/project-filters/project-filters.component';
import {ProjectDetailsComponent} from './components/project-details/project-details.component';
import {
  SupervisorAvailabilityFormComponent
} from './components/supervisor-availability-form/supervisor-availability-form.component';
import {
  SupervisorAvailabilityListComponent
} from './components/supervisor-availability-list/supervisor-availability-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ProjectRemoveDialogComponent} from './components/project-remove-dialog/project-remove-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectGradeComponent} from './components/project-grade/project-grade.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '../shared/shared.module';
import {
  RadioCriterionSelectComponent
} from './components/project-grade/components/radio-criterion-select/radio-criterion-select.component';
import {
  DiplomaChapterFormComponent
} from '../diploma-theses/components/diploma-chapter-form/diploma-chapter-form.component'
import {DiplomaEffects} from '../diploma-theses/state/diploma.effects'
import {
  DiplomaProjectFormComponent
} from "../diploma-theses/components/diploma-project-form/diploma-project-form.component";

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    DiplomaChapterFormComponent,
    DiplomaProjectFormComponent,
    ProjectDetailsComponent,
    ProjectFiltersComponent,
    ProjectComponent,
    ProjectGradeComponent,
    SupervisorAvailabilityListComponent,
    SupervisorAvailabilityFormComponent,
    ProjectRemoveDialogComponent,
    RadioCriterionSelectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatMenuModule,
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects, DiplomaEffects]),
    SharedModule
  ]
})
export class ProjectModule {
}
