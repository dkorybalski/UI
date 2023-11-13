import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getFilters, getGrades } from '../../state/grade.selectors';
import { State } from 'src/app/app.state';
import { Router } from '@angular/router';
import { loadGrades } from '../../state/grade.actions';
import { Grade } from '../../models/grade';

@Component({
  selector: 'grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})

export class GradeListComponent implements OnDestroy, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columns = ['projectName', 'supervisorName', 'grade', 'criteriaMetStatus'];
  grades!: MatTableDataSource<Grade>;
  unsubscribe$ = new Subject();
  loading = true;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadGrades());

    combineLatest([
      this.store.select(getGrades),
      this.store.select(getFilters),
    ]).pipe(
      tap(() => this.loading = true),
      takeUntil(this.unsubscribe$)).subscribe(
      ([grades, filters]) => {
        if(grades !== undefined){
          const mappedGrades = grades.map((grade) => {
            return { 
                ...grade,
                supervisorName: grade.supervisor.name, 
            }
          })

          const filteredGrades = mappedGrades.slice().filter(
            grade => 
                this.filterGradeBySearchValue(grade, filters.searchValue) && 
                (
                  this.filterGradeByCriteriaMetStatus(grade, filters.criteriaMetStatus) &&
                  this.filterGradeBySupervisorIndexNumber(grade, filters.supervisorIndexNumber)
                )             
          )
          this.grades = new MatTableDataSource<Grade>(filteredGrades);
          this.grades.paginator = this.paginator;
          this.grades.sort = this.sort;

          this.loading = false;
        }
      }
    )
  }

  filterGradeBySearchValue(grade: Grade, searchValue: string): boolean {
    return grade.projectName.toLowerCase().includes(searchValue.toLowerCase()) ||
           grade.supervisor.name.toLowerCase().includes(searchValue.toLowerCase())
  }

  filterGradeByCriteriaMetStatus(grade: Grade, criteriaMetStatus?: boolean): boolean {
    return criteriaMetStatus !== undefined ? grade.criteriaMet === criteriaMetStatus : true
  }

  filterGradeBySupervisorIndexNumber(grade: Grade, supervisorIndexNumber?: string): boolean {
    return supervisorIndexNumber !== undefined ? grade.supervisor.indexNumber === supervisorIndexNumber : true
  }

  navigateToGradeDetails(gradeId: string){
    this.router.navigate([`grades/details/${gradeId}`]) 
    //this.router.navigate([{outlets: {modal: `grades/details/${gradeId}`}}]) 

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
