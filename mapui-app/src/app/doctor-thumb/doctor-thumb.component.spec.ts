import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorThumbComponent } from './doctor-thumb.component';

describe('DoctorThumbComponent', () => {
  let component: DoctorThumbComponent;
  let fixture: ComponentFixture<DoctorThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorThumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
