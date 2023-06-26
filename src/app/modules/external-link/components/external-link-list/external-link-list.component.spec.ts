import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLinkListComponent } from './external-link-list.component';

describe('ExternalLinkListComponent', () => {
  let component: ExternalLinkListComponent;
  let fixture: ComponentFixture<ExternalLinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalLinkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
