import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorAvailabilityFormComponent } from './supervisor-availability-form.component';

describe('SupervisorAvailabilityFormComponent', () => {
  let component: SupervisorAvailabilityFormComponent;
  let fixture: ComponentFixture<SupervisorAvailabilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAvailabilityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorAvailabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
