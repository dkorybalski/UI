import { Component, OnDestroy, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ExternalLinkService } from '../../external-link.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { projectAcceptedByStudent } from 'src/app/modules/user/state/user.selectors';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ExternalLink } from '../../models/external-link.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'external-link-form',
  templateUrl: './external-link-form.component.html',
  styleUrls: ['./external-link-form.component.scss']
})
export class ExternalLinkFormComponent implements OnDestroy {
  form = this.fb.group({
    externalLinks: this.fb.array<ExternalLink>([]),
  });
  unsubscribe$ = new Subject();
  projectId!: number;

  constructor(
    private fb: FormBuilder, private store: Store<State>, 
    private externalLinkService: ExternalLinkService,
    private _snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.store.select(projectAcceptedByStudent).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(projectId => {
        this.projectId = projectId;
        return this.externalLinkService.getExternalLinks(projectId)
      })
    ).subscribe(
      externalLinks => {
        externalLinks.forEach(externalLink => {
          this.externalLinks.push(this.fb.group({
            id: externalLink.id,
            url: externalLink.url,
            name: externalLink.name,
            columnHeader: externalLink.columnHeader,
            deadline: externalLink.deadline
        }))
      })
    })
  }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  getFormControl(externalLink: AbstractControl): {name: string, deadline: string, url: FormControl} {
    return {
      name: externalLink.get('name')?.value,
      deadline: externalLink.get('deadline')?.value,
      url: externalLink.get('url') as FormControl
    }
  }


  onSubmit(): void {
    if(this.form.valid){
      let externalLinks: ExternalLink[] = [];
      this.externalLinks.controls.forEach(control => {
        externalLinks.push({
          id: control.get('id')?.value,
          url: control.get('url')?.value,
          name: control.get('name')?.value,
          columnHeader: control.get('columnHeader')?.value,
          deadline: control.get('deadline')?.value
        })
      })
      console.log(externalLinks)
      this.externalLinkService.setExternalLinks(this.projectId, externalLinks)
        .pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: () => {
            this._snackbar.open('External links successfully updated', 'close');
          },
          error:() => {
            this._snackbar.open('External links failed to be updated', 'close');
          }
        })
    }
  }

  get externalLinks(): FormArray {
    return this.form.get('externalLinks') as FormArray;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }

}
