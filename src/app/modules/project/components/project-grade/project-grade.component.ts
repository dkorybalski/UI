import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EvaluationCard } from '../../models/grade.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { GradeService } from '../../services/grade.service';

@Component({
  selector: 'project-grade',
  templateUrl: './project-grade.component.html',
  styleUrls: ['./project-grade.component.scss']
})
export class ProjectGradeComponent implements OnInit, OnDestroy {

  @Input() evaulationCard!:  EvaluationCard;
  @Input() projectId!: number;
  data!: EvaluationCard;
  unsubscribe$ = new Subject();
  gradeForm = this.fb.group<{[key: string]: FormGroup }>({});
  columns = ['criterion', 'description', 'disqualifying'];
  criteriaSymbols = ['1p','2p','3p','4p'];
  criteriaKeys = [
    'CRITERION_NOT_MET',
    'UNSUCCESSFUL_ATTEMPT_TO_MEET_THE_CRITERION',
    'CRITERION_MET_WITH_RESERVATIONS',
    'CRITERION_MET'
  ]
  criterionGroupExpandedStatus: { [key: string]:  boolean } = {};
  selectedSemester = 'FIRST';
  expanded = false;
  

  constructor(private gradeSerice: GradeService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
      this.data = this.evaulationCard;

      this.data.sections.forEach(section => {
        this.gradeForm.addControl(section.id, this.fb.group<{[key: string]: FormControl }>({}))

        section.criteriaGroups.forEach(group => {
          this.gradeForm.controls[section.id].addControl(group.id, new FormControl(group.selectedCriterion))
          this.criterionGroupExpandedStatus[`${section.id}_${group.id}`] = false;
        })
      })
  }

  navigateBack(){
    this.router.navigate([{outlets: {modal: null}}]);
  }


  isRadioButtonChecked(sectionIndex: string, groupIndex: string, value: string): boolean {
    return this.gradeForm.controls[sectionIndex].controls[groupIndex].value === value
  }

  selectCriterion(sectionIndex: string, groupIndex: string, key: string): void {
    console.log('hey')
    this.gradeForm.controls[sectionIndex].controls[groupIndex].setValue(key);
    this.gradeSerice.changeGrade(this.projectId, this.evaulationCard.id, { id: groupIndex, selectedCriterion: key } )
      .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  unselectCriterion(sectionIndex: string, groupIndex: string): void {
    this.gradeForm.controls[sectionIndex].controls[groupIndex].setValue(null);
    this.gradeSerice.changeGrade(this.projectId, this.evaulationCard.id, { id: groupIndex, selectedCriterion: null })
      .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
 
  isDisqualifying(sectionIndex: string, groupIndex: string, key: string): boolean | undefined {
    return this.data.sections.find(section => section.id === sectionIndex)?.criteriaGroups.find(group => group.id === groupIndex)?.criteria[key].isDisqualifying
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

  semesterChange(event: MatButtonToggleChange){
   console.log('hey')
  }
}
