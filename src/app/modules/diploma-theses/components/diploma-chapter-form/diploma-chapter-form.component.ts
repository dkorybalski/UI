import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Subject, takeUntil} from 'rxjs'
import {Router} from '@angular/router'
import {AddOrUpdateDiplomaChapter, Diploma} from '../../models/diploma.model'
import {Actions, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {State} from '../../../../app.state'
import {MatSnackBar} from '@angular/material/snack-bar'
import {
  updateDiplomaChapter,
  updateDiplomaChapterFailure,
  updateDiplomaChapterSuccess
} from '../../state/diploma.actions'
import {Student} from '../../../user/models/student.model'

@Component({
  selector: 'diploma-chapter-form',
  templateUrl: './diploma-chapter-form.component.html',
  styleUrls: ['./diploma-chapter-form.component.scss']
})
export class DiplomaChapterFormComponent implements OnInit, OnDestroy {
  diplomaForm = this.fb.group({
    chapterTitle: ['', Validators.required],
    chapterDescription: ['', Validators.required],
    student: ['', Validators.required],
    project: ['', Validators.required]
  })
  projectName = ''
  projectId: number = 0
  unsubscribe$ = new Subject()
  student!: Student
  diploma: Diploma | undefined

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private actions$: Actions,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.student = history.state.student
    this.diploma = history.state.diploma
    this.projectId = history.state.projectId
    this.projectName = history.state.projectName

    this.diplomaForm.controls.student.setValue(this.student.name)
    this.diplomaForm.controls.project.setValue(this.projectName)

    if (this.diploma) {
      this.diplomaForm.controls.chapterDescription.setValue(this.diploma.description)
      this.diplomaForm.controls.chapterTitle.setValue(this.diploma.description)
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
    let addOrUpdateDiplomaChapter: AddOrUpdateDiplomaChapter = {
      title: this.diplomaForm.controls.chapterTitle.value!,
      description: this.diplomaForm.controls.chapterTitle.value!,
      studentIndex: this.student.indexNumber,
      projectId: this.projectId
    }

    this.store.dispatch(updateDiplomaChapter({addOrUpdateDiplomaChapter: addOrUpdateDiplomaChapter}))
    this.actions$.pipe(ofType(updateDiplomaChapterSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this._snackbar.open('Diploma chapter successfully updated', 'close')
        this.router.navigate([{outlets: {modal: null}}])
      })
    this.actions$.pipe(ofType(updateDiplomaChapterFailure), takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this._snackbar.open('Diploma chapter failure updated', 'close')
      })
  }

  ngOnDestroy(): void {

  }
}
