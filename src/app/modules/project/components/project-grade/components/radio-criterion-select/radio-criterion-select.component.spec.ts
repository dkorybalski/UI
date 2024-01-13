import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCriterionSelectComponent } from './radio-criterion-select.component';

describe('RadioCriterionSelectComponent', () => {
  let component: RadioCriterionSelectComponent;
  let fixture: ComponentFixture<RadioCriterionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioCriterionSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioCriterionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
