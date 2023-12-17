import { Component, ViewChild, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DefenseScheduleService } from '../../defense-schedule.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project, ProjectDefense } from '../../models/defense-schedule.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'defense-schedule-selection',
  templateUrl: './defense-schedule-selection.component.html',
  styleUrls: ['./defense-schedule-selection.component.scss']
})
export class DefenseScheduleSelectionComponent implements OnInit, OnDestroy, OnChanges {
  columns = ['date', 'time', 'project', 'class', 'committee', 'students']

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  dataSource!: MatTableDataSource<ProjectDefense>;
  projects: Project[] = [];
  unsubscribe$ = new Subject();
  @Input() userRole!: string;
  @Input() defenses!: ProjectDefense[];
  updatedDefenses: ProjectDefense[] = [];

  constructor(private defenseScheduleService: DefenseScheduleService){}

  ngOnInit(): void {
    this.defenseScheduleService.getProjects().subscribe(
      projects => this.projects = projects
    )

    this.dataSource = new MatTableDataSource<ProjectDefense>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if(this.userRole === 'STUDENT' || this.userRole === 'PROJECT_ADMIN'){
      this.columns = ['checkbox', ...this.columns]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.defenses){
      this.dataSource = new MatTableDataSource<ProjectDefense>(this.defenses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  updateDefenses(){
    this.defenseScheduleService.updateProjectDefenses(this.updatedDefenses)
      .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  projectChanged(event: MatSelectChange, defense: ProjectDefense){
    if(!this.updatedDefenses.find(def => def.projectDefenseId === defense.projectDefenseId)){
      this.updatedDefenses.push(defense)
    }
  }

  defenseSelected(event: MatRadioChange, defenseId: string){
    this.defenseScheduleService.updateProjectDefense(defenseId, event.value)
      .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
