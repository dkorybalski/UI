import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExternalLinkListComponent } from './components/external-link-list/external-link-list.component';
import { ExternalLinkComponent } from './external-link.component';
import { ExternalLinkRoutingModule } from './external-link-routing.module';
import { ExternalLinkFormComponent } from './components/external-link-form/external-link-form.component';
import { ExternalLinkFiltersComponent } from './components/external-link-filters/external-link-filters.component';
import { ExternalLinkDetailsComponent } from './components/external-link-details/external-link-details.component';

@NgModule({
  declarations: [
    ExternalLinkListComponent,
    ExternalLinkComponent,
    ExternalLinkFormComponent,
    ExternalLinkFiltersComponent,
    ExternalLinkDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatSnackBarModule,
    ExternalLinkRoutingModule
  ],
  exports: [
    ExternalLinkDetailsComponent
  ]
})
export class ExternalLinkModule { }
