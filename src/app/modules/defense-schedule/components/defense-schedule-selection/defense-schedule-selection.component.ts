import { Component, ViewChild, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DefenseScheduleService } from '../../defense-schedule.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project, ProjectDefense } from '../../models/defense-schedule.model';
import { MatSelectChange } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/user/models/user.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';

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
  user!: User;
  @Input() defenses!: ProjectDefense[];
  updatedDefenses: ProjectDefense[] = [];


  constructor(private defenseScheduleService: DefenseScheduleService, private store: Store<State>){}

  ngOnInit(): void {
    this.defenseScheduleService.getProjects().subscribe(
      projects => this.projects = projects
    )

    this.store.select('user').subscribe(user => {
      this.user = user;
      if(this.user.role === 'PROJECT_ADMIN'){
        this.columns = ['checkbox', ...this.columns]
      }
    });

    this.dataSource = new MatTableDataSource<ProjectDefense>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(this.user)
    if(this.defenses){
      this.dataSource = new MatTableDataSource<ProjectDefense>(this.defenses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  updateDefenses(){
    this.defenseScheduleService.updateProjectDefenses(this.updatedDefenses)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        
      )
  }

  projectChanged(event: MatSelectChange, defense: ProjectDefense){
    if(!this.updatedDefenses.find(def => def.projectDefenseId === defense.projectDefenseId)){
      this.updatedDefenses.push(defense)
    }
  }

  defenseSelected(defenseId: string){
    this.defenseScheduleService.updateProjectDefense(defenseId, String(this.user.acceptedProjects[0]))
      .pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
