import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDrugsListComponent } from './dialog-drugs-list.component';

describe('DialogDrugsListComponent', () => {
  let component: DialogDrugsListComponent;
  let fixture: ComponentFixture<DialogDrugsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDrugsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDrugsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
