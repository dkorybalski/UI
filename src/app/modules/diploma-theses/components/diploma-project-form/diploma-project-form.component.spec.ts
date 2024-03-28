import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiplomaProjectFormComponent} from './diploma-project-form.component';

describe('ProjectComponent', () => {
  let component: DiplomaProjectFormComponent;
  let fixture: ComponentFixture<DiplomaProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiplomaProjectFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiplomaProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
