import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPatientFormComponent } from './dialog-patient-form.component';

describe('DialogPatientFormComponent', () => {
  let component: DialogPatientFormComponent;
  let fixture: ComponentFixture<DialogPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPatientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
