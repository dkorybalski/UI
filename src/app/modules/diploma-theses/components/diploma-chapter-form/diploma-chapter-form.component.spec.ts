import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiplomaChapterFormComponent} from './diploma-chapter-form.component';

describe('ProjectComponent', () => {
  let component: DiplomaChapterFormComponent;
  let fixture: ComponentFixture<DiplomaChapterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiplomaChapterFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiplomaChapterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
