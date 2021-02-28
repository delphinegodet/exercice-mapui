import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDoctorFormComponent } from './dialog-doctor-form.component';

describe('DialogDoctorFormComponent', () => {
  let component: DialogDoctorFormComponent;
  let fixture: ComponentFixture<DialogDoctorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDoctorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
