import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReadOnlyComponent } from './patient-read-only.component';

describe('PatientReadOnlyComponent', () => {
  let component: PatientReadOnlyComponent;
  let fixture: ComponentFixture<PatientReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientReadOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
