import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeDetails } from '../../models/grade';
import { Subject } from 'rxjs';
import { UserState } from 'src/app/modules/user/state/user.state';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.scss']
})
export class GradeDetailsComponent implements OnInit, OnDestroy {

  data!: GradeDetails;
  unsubscribe$ = new Subject();
  user!: UserState;
  gradeForm = this.fb.group<{[key: string]: FormGroup }>({});
  columns = ['criterion', 'description', 'mandatory'];
  criteriaDetails = {};
  criteriaSymbols = ['I','II','III','IV'];
  criterionGroupExpandedStatus: { [key: string]: boolean } = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({gradeDetails, user}) => {
      this.data = gradeDetails;
      this.user = user;

      this.data.sections.forEach(section => {
        this.gradeForm.addControl(section.id, this.fb.group<{[key: string]: FormControl }>({}))

        section.criteriaGroups.forEach(group => {
          this.gradeForm.controls[section.id].addControl(group.id, new FormControl(group.selectedCriterion))
          this.criterionGroupExpandedStatus[group.id] = false;
        })

      })
    })
  }

  navigateBack(){
    this.router.navigate([{outlets: {modal: null}}]);
  }


  isRadioButtonChecked(sectionIndex: string, groupIndex: string, value: number): boolean {
    return this.gradeForm.controls[sectionIndex].controls[groupIndex].value === value
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }

  
  onSubmit(): void {
    if (this.gradeForm.valid) {    
      console.log(this.gradeForm.value)
    }
  }

  getGradeData(sectionIndex: string, groupIndex: string): FormControl {
    return this.gradeForm.controls[sectionIndex].controls[groupIndex] as FormControl
  }
}
