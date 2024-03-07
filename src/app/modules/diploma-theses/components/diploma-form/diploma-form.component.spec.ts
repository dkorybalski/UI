import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiplomaFormComponent} from './diploma-form.component';

describe('ProjectComponent', () => {
  let component: DiplomaFormComponent;
  let fixture: ComponentFixture<DiplomaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiplomaFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiplomaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
