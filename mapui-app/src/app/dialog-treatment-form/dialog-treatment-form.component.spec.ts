import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTreatmentFormComponent } from './dialog-treatment-form.component';

describe('DialogTreatmentFormComponent', () => {
  let component: DialogTreatmentFormComponent;
  let fixture: ComponentFixture<DialogTreatmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTreatmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTreatmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
