import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectGradeComponent } from './project-grade.component';

describe('ProjectGradeComponent', () => {
  let component: ProjectGradeComponent;
  let fixture: ComponentFixture<ProjectGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
