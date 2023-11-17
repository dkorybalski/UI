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
  columns = ['criterion', 'description', 'disqualifying'];
  criteriaSymbols = ['1p','2p','3p','4p'];
  criteriaKeys = [
    'CRITERION_NOT_MET',
    'UNSUCCESSFUL_ATTEMPT_TO_MEET_THE_CRITERION',
    'CRITERION_MET_WITH_RESERVATIONS',
    'CRITERION_MET'
  ]
  criterionGroupExpandedStatus: { [key: string]: boolean } = {};
  selectedSemester = 'FIRST';
  expanded = false;

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


  isRadioButtonChecked(sectionIndex: string, groupIndex: string, value: string): boolean {
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

  expandAllCriteriaDetails(){
    this.expanded = !this.expanded;
    for(let key in this.criterionGroupExpandedStatus){
      this.criterionGroupExpandedStatus[key] = this.expanded;
    }
  }

  getSelectedCriterion(sectionId: string, groupId: string){
    return this.gradeForm.controls[sectionId].controls[groupId].value
  }

  getGradeData(sectionIndex: string, groupIndex: string): FormControl {
    return this.gradeForm.controls[sectionIndex].controls[groupIndex] as FormControl
  }
}
