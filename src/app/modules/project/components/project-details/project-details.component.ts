import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupervisorAvailability} from '../../models/supervisor-availability.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/modules/user/models/student.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subject, takeUntil} from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { UserState } from 'src/app/modules/user/state/user.state';
import { acceptProject, acceptProjectSuccess, removeProject, removeProjectSuccess, unacceptProject, unacceptProjectSuccess } from '../../state/project.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ProjectRemoveDialogComponent } from '../project-remove-dialog/project-remove-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectDetails } from '../../models/project.model';
import { EvaluationCard, EvaluationCards } from '../../models/grade.model';
import { KeyValue } from '@angular/common';

enum ROLE {
  FRONTEND = 'front-end',
  BACKEND = 'back-end',
  FULLSTACK = 'full-stack',
  SUPERVISOR = 'supervisor',
}

@Component({
    selector: 'project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  members!: MatTableDataSource<Student>;
  selection = new SelectionModel<Student>(false, []);
  selectedItem = <Student>{};
  columns = ['name', 'email', 'role', 'status']
  unsubscribe$ = new Subject();
  maxAvailabilityFilled: boolean = false;
  data!: ProjectDetails;
  user!: UserState;
  evaluationCards!: EvaluationCards;
  gradesShown = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>,
    private actions$: Actions,
    private dialog: MatDialog,
    private router: Router,
    private _snackbar: MatSnackBar,

    ){}
   
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({projectDetails, supervisorAvailability, user, evaluationCards}) => {
      this.data = projectDetails;
      this.user = user;
      this.evaluationCards = evaluationCards;
      this.members = new MatTableDataSource<Student>([
        {...this.data?.supervisor!, 
          role: 'SUPERVISOR', 
          accepted:  this.data?.accepted
        },
        ...this.data?.students!  
      ])
      let projectSupervisorAvailability = supervisorAvailability.find(
        (availability: SupervisorAvailability) => availability.supervisor.indexNumber === this.data.supervisor?.indexNumber
      )
      if(projectSupervisorAvailability){
        this.maxAvailabilityFilled = projectSupervisorAvailability?.assigned === projectSupervisorAvailability?.max
      }
    })
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  acceptProject(): void {
    this.store.dispatch(acceptProject({projectId: this.data.id!, role: this.user.role}))
    this.actions$.pipe(ofType(acceptProjectSuccess),takeUntil(this.unsubscribe$),).subscribe(() => {
      this.members = new MatTableDataSource<Student>([
        {...this.data?.supervisor!, role: 'SUPERVISOR', accepted:  this.data?.accepted},
        ...this.data?.students!
        ].map(
          member => {
            if(member.indexNumber === this.user.indexNumber){
              member.accepted = true;
            } 
            return member
          }
        ))

    });
  }

  isProjectAdmin(member: Student){
    return  member.indexNumber === this.data.admin
  }

  isSupervisor(member: Student){
    return  member.indexNumber === this.data.supervisor.indexNumber
  }

  unacceptProject(): void {
    this.store.dispatch(unacceptProject({projectId: this.data.id!, role: this.user.role}))
    this.actions$.pipe(ofType(unacceptProjectSuccess),takeUntil(this.unsubscribe$),).subscribe(() => {
      this.members = new MatTableDataSource<Student>([
        {...this.data?.supervisor!, role: 'SUPERVISOR', accepted:  this.data?.accepted},
        ...this.data?.students!
        ].map(
          member => {
            if(member.indexNumber === this.user.indexNumber){
              member.accepted = false;
            } 
            return member
          }
        ))

    })
  }

  editProject(){
    this.router.navigate([{outlets: {modal: `projects/form/${this.data.id}`}}], { queryParams: {comingFromDetailsPage: true} });
  }

  openRemoveProjectDialog(){
    const dialogRef = this.dialog.open(ProjectRemoveDialogComponent, {
      data: { projectName: this.data.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(removeProject({projectId: this.data.id!}))
        this.actions$.pipe(ofType(removeProjectSuccess),takeUntil(this.unsubscribe$),).subscribe(() => {
          this.router.navigate ([`projects`]) 
          this._snackbar.open('Project successfully removed', 'close');
        })
      }
    });
  }

  get showRemoveButton(){
    if(
      (this.user.role === 'PROJECT_ADMIN' && 
       this.user.acceptedProjects.includes(this.data.id!) &&
       !this.data.accepted
      )
      ||
      (this.user.role === 'COORDINATOR')
    ){
      return true
    } else {
      return false
    }
  }

  get showEditButton(){
    if(
      (this.user.role === 'PROJECT_ADMIN' && 
       this.user.acceptedProjects.includes(this.data.id!)
      )
      ||
      (this.user.role === 'COORDINATOR')
      ||
      ((this.user.role === 'SUPERVISOR') &&
      this.user.acceptedProjects.includes(this.data.id!))
    ){
      return true
    } else {
      return false
    }
  }
  
  
 
  get showAcceptButton(){
   if(
      (this.user.role === 'STUDENT' && 
      this.user.acceptedProjects.length === 0 && 
      this.user.projects.includes(this.data.id!))
      ||
      ((this.user.role === 'SUPERVISOR' || this.user.role === 'COORDINATOR') &&
      !this.user.acceptedProjects.includes(this.data.id!) &&
      this.user.projects.includes(this.data.id!) &&
      this.data.confirmed &&
      !this.maxAvailabilityFilled)
    ){
      return true
    } else {
      return false
    }
  }

  get showUnacceptButton(){
    return this.user.role === 'STUDENT' && this.user.acceptedProjects.includes(this.data.id!)
  }

  get showGradesButton(){
    return this.evaluationCards;
  }

  getEvaluationCardsTranslations(key: string): string{
    const translations: {[key: string]: string} = {
      'FIRST': 'First semester',
      'SECOND': 'Second semester',
      'SEMESTER_PHASE': 'Semester phase',
      'DEFENSE_PHASE': 'Defense phase',
      'RETAKE_PHASE': 'Retake phase',
    }

    return translations[key];
  }

  isOnlyOnePhaseVisible(semester: {[key: string]: EvaluationCard}): boolean {
    return Object.keys(semester).filter(key => semester[key]['visible']).length === 1;
  }

  allPhasesAreNotVisible(semester: {[key: string]: EvaluationCard}): boolean {
    return Object.keys(semester).filter(key => semester[key]['visible']).length === 0;
  }

  getRole(role: keyof typeof ROLE): string {
    return ROLE[role]
  }

  navigateBack(){
    this.router.navigate([{outlets: {modal: null}}]);
  }

  get showExternalLinks(): boolean{
   return this.user.acceptedProjects.includes(this.data.id!) || 
          this.user.role === 'COORDINATOR' || 
          this.user.role === 'SUPERVISOR'
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete()
  }
}
