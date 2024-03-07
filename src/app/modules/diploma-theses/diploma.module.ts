import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select'
import {MatChipsModule} from '@angular/material/chips'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSortModule} from '@angular/material/sort'
import {MatRadioModule} from '@angular/material/radio'
import {StoreModule} from '@ngrx/store'
import {diplomaReducer} from './state/diploma.reducer'
import {EffectsModule} from '@ngrx/effects'
import {DiplomaEffects} from './state/diploma.effects'
import {DiplomaComponent} from './diploma.component'
import {DiplomaRoutingModule} from './diploma-routing.module'
import {DiplomaListComponent} from './components/diploma-list/diploma-list.component'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatDividerModule} from '@angular/material/divider'
import {MatTabsModule} from '@angular/material/tabs'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatMenuModule} from '@angular/material/menu'
import {SharedModule} from '../shared/shared.module'
import {DiplomaDetailsComponent} from './components/diploma-details/diploma-details.component'

@NgModule({
  declarations: [
    DiplomaListComponent,
    DiplomaComponent,
    DiplomaDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DiplomaRoutingModule,
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
    StoreModule.forFeature('diploma', diplomaReducer),
    EffectsModule.forFeature([DiplomaEffects]),
    SharedModule
  ]
})
export class DiplomaModule {
}
