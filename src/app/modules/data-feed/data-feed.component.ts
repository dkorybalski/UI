import {Component, OnDestroy} from '@angular/core';
import {DataFeedService} from './data-feed.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject, takeUntil} from 'rxjs';
import {saveAs} from 'file-saver';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-data-feed',
  templateUrl: './data-feed.component.html',
  styleUrls: ['./data-feed.component.scss']
})
export class DataFeedComponent implements OnDestroy {
  supervisorsFileName = '';
  supervisorsFile!: FormData;
  studentsFileName = '';
  studentsFile!: FormData;
  criteriaFileName = '';
  criteriaFile!: FormData;
  unsubscribe$ = new Subject();

  constructor(private _snackBar: MatSnackBar, private dataFeedService: DataFeedService) {}

  uploadStudents(event: any) {
      const file: File = event.target.files[0];
      if (file) {
          this.studentsFileName= file.name;
          this.studentsFile = new FormData();
          this.studentsFile.append("data", file);
      }
  }

  uploadSupervisors(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.supervisorsFileName = file.name;
        this.supervisorsFile = new FormData();
        this.supervisorsFile.append("data", file);
    }
  }

  uploadCriteria(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.criteriaFileName = file.name;
        this.criteriaFile = new FormData();
        this.criteriaFile.append("data", file);
    }
  }

  uploadFiles(){
    if(this.studentsFile){
      this.dataFeedService.uploadStudents(this.studentsFile).pipe(takeUntil(this.unsubscribe$)).subscribe(
        () => {
          this.studentsFileName = '';
          this.studentsFile = new FormData();
          this._snackBar.open('Students successfully uploaded', 'close');
        }
      )
    }
    if(this.supervisorsFile){
      this.dataFeedService.uploadSupervisors(this.supervisorsFile).pipe(takeUntil(this.unsubscribe$)).subscribe(
        () => {
          this.supervisorsFileName = '';
          this.supervisorsFile = new FormData();
          this._snackBar.open('Supervisors successfully uploaded', 'close');
        }
      )
    }

    if(this.criteriaFile){
      this.dataFeedService.uploadCriteria(this.criteriaFile).pipe(takeUntil(this.unsubscribe$)).subscribe(
        () => {
          this.criteriaFileName = '';
          this.criteriaFile = new FormData();
          this._snackBar.open('Criteria successfully uploaded', 'close');
        }
      )
    }
  }

  exportStudents(){
      this.dataFeedService.exportStudents().pipe(takeUntil(this.unsubscribe$)).subscribe(
        (file: HttpResponse<Blob>) => {
          if(file?.body){
            saveAs(file.body!, 'students.csv')
          }
        }
      )
  }

  exportCriteria(){
    this.dataFeedService.exportCriteria().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (file: HttpResponse<Blob>) => {
        if(file?.body){
          saveAs(file.body!, 'criteria.json')
        }
      }
    )
  }

  exportGrades(){
    this.dataFeedService.exportGrades().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (file: HttpResponse<Blob>) => {
        if(file?.body){
          saveAs(file.body!, 'grades.csv')
        }
      }
    )
  }

  exportDiplomas() {
    this.dataFeedService.exportDiplomas().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (file: HttpResponse<Blob>) => {
        if (file?.body) {
          saveAs(file.body!, 'diplomas.txt')
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
