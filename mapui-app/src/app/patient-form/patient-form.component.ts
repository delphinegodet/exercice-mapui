import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {MatDialog} from '@angular/material/dialog';
import {DialogPatientFormComponent} from '../dialog-patient-form/dialog-patient-form.component';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})

export class PatientFormComponent {

  @Input() create = true;
  @Input() currentPatient: Patient | undefined;
  @Output() addPatient: EventEmitter<Patient> = new EventEmitter<Patient>();
  @Output() updatePatient: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(DialogPatientFormComponent,  {
      data: {
        create: this.create,
        currentPatient: this.currentPatient,
        addPatient: this.addPatient,
        updatePatient: this.updatePatient
      }
    });
  }
}
