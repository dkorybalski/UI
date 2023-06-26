import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRemoveDialogComponent } from './project-remove-dialog.component';

describe('ProjectRemoveDialogComponent', () => {
  let component: ProjectRemoveDialogComponent;
  let fixture: ComponentFixture<ProjectRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRemoveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
