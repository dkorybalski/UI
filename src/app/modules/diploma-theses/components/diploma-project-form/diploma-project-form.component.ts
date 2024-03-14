import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Subject, takeUntil} from 'rxjs'
import {ActivatedRoute, Router} from '@angular/router'
import {AddOrUpdateDiplomaProject, Diploma} from '../../models/diploma.model'
import {Actions, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {State} from '../../../../app.state'
import {MatSnackBar} from '@angular/material/snack-bar'
import {
  updateDiplomaProject,
  updateDiplomaProjectFailure,
  updateDiplomaProjectSuccess,
} from '../../state/diploma.actions'
import {Student} from '../../../user/models/student.model'

@Component({
  selector: 'diploma-chapter-form',
  templateUrl: './diploma-project-form.component.html',
  styleUrls: ['./diploma-project-form.component.scss']
})
export class DiplomaProjectFormComponent implements OnInit, OnDestroy {
  diplomaForm = this.fb.group({
    titleEn: ['', Validators.required],
    titlePl: ['', Validators.required],
    diplomaDescription: ['', Validators.required],
    project: ['', Validators.required]
  })
  projectName = ''
  projectId: number = 0
  unsubscribe$ = new Subject()
  student!: Student
  diploma: Diploma | undefined

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private actions$: Actions,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.diploma = history.state.diploma
    this.projectId = history.state.projectId
    this.projectName = history.state.projectName
    this.diplomaForm.controls.project.setValue(this.projectName)

    if (this.diploma) {
      this.diplomaForm.controls.titlePl.setValue(this.diploma.titlePl)
      this.diplomaForm.controls.titleEn.setValue(this.diploma.titleEn)
      this.diplomaForm.controls.diplomaDescription.setValue(this.diploma.description)
    }
  }

  getErrorMessage(controlName: string): string {
    if (this.diplomaForm.get(controlName)?.hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  navigateBack(): void {
    this.router.navigate([{outlets: {modal: `projects/details/${this.projectId}`}}])
  }

  onSubmit(): void {
    if (this.diplomaForm.invalid) {
      return
    }
    let addOrUpdateDiplomaProject: AddOrUpdateDiplomaProject = {
      titleEn: this.diplomaForm.controls.titleEn.value!,
      titlePl: this.diplomaForm.controls.titlePl.value!,
      description: this.diplomaForm.controls.diplomaDescription.value!,
      projectId: this.projectId
    }

    this.store.dispatch(updateDiplomaProject({addOrUpdateDiplomaProject: addOrUpdateDiplomaProject}))
    this.actions$.pipe(ofType(updateDiplomaProjectSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this._snackbar.open('Diploma successfully updated', 'close')
        this.router.navigate([{outlets: {modal: null}}])
      })
    this.actions$.pipe(ofType(updateDiplomaProjectFailure), takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this._snackbar.open('Diploma failure updated', 'close')
      })
  }

  ngOnDestroy(): void {

  }
}
