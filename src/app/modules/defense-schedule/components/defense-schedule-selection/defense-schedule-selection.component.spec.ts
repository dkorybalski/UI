import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseScheduleSelectionComponent } from './defense-schedule-selection.component';

describe('DefenseScheduleSelectionComponent', () => {
  let component: DefenseScheduleSelectionComponent;
  let fixture: ComponentFixture<DefenseScheduleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenseScheduleSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseScheduleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
