import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkDetailsComponent } from './external-link-details.component';

describe('ExternalLinkDetailsComponent', () => {
  let component: ExternalLinkDetailsComponent;
  let fixture: ComponentFixture<ExternalLinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalLinkDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalLinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
