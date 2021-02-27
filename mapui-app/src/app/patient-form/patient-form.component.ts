import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';

const newPatientInit = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  age: new FormControl(0, Validators.required),
  sex: new FormControl(0, Validators.required)
});

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})

export class PatientFormComponent implements OnInit {

  @Output() addPatient: EventEmitter<Patient> = new EventEmitter<Patient>();

  newPatient = newPatientInit;

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
  }

  create(): void {
    if (this.newPatient.value.firstName === '' || this.newPatient.value.lastName === '' ||
      this.newPatient.value.age === 0 || this.newPatient.value.sex === 0) {
      return;
    }

    const createPatient: Patient = {...this.newPatient.value};

    this.patientsService.addPatient(createPatient)
      .subscribe((patient: Patient) => {
        this.addPatient.emit(patient);
      });
  }
}
