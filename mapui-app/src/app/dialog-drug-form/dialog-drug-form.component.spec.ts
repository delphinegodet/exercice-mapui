import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDrugFormComponent } from './dialog-drug-form.component';

describe('DialogDrugFormComponent', () => {
  let component: DialogDrugFormComponent;
  let fixture: ComponentFixture<DialogDrugFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDrugFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDrugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
