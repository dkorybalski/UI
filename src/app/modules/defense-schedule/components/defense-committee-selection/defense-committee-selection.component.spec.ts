import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseTimeSlotsSelectionComponent } from './defense-time-slots-selection.component';

describe('DefenseTimeSlotsSelectionComponent', () => {
  let component: DefenseTimeSlotsSelectionComponent;
  let fixture: ComponentFixture<DefenseTimeSlotsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenseTimeSlotsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseTimeSlotsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
