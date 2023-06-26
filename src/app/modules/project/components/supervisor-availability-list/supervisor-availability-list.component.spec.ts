import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupervisorAvailabilityListComponent } from './supervisor-availability-list.component';

describe('SupervisorAvailabilityListComponent', () => {
  let component: SupervisorAvailabilityListComponent;
  let fixture: ComponentFixture<SupervisorAvailabilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorAvailabilityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorAvailabilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
