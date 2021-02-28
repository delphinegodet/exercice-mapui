import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Doctor} from '../interfaces/Doctor';
import {DialogDoctorFormComponent} from '../dialog-doctor-form/dialog-doctor-form.component';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent {

  @Input() create = true;
  @Input() currentDoctor: Doctor | undefined;
  @Output() addDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() updateDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(DialogDoctorFormComponent,  {
      data: {
        create: this.create,
        currentDoctor: this.currentDoctor,
        addDoctor: this.addDoctor,
        updateDoctor: this.updateDoctor
      }
    });
  }
}
