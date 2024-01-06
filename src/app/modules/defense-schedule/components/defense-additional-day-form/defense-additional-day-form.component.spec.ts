import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseDateRangeSelectionComponent } from './defense-date-range-selection.component';

describe('DefenseDateRangeSelectionComponent', () => {
  let component: DefenseDateRangeSelectionComponent;
  let fixture: ComponentFixture<DefenseDateRangeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenseDateRangeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseDateRangeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
