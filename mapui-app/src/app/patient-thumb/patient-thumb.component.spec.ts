import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientThumbComponent } from './patient-thumb.component';

describe('PatientThumbComponent', () => {
  let component: PatientThumbComponent;
  let fixture: ComponentFixture<PatientThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
