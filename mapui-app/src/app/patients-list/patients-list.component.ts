import { Component, OnInit } from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})

export class PatientsListComponent implements OnInit {
  patients: Patient[];

  newPatient = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    sex: new FormControl(0, Validators.required)
  });

  constructor(private patientsService: PatientsService) {
    this.patients = [];
  }

  getPatients(): void {
    this.patientsService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  ngOnInit(): void {
    this.getPatients();
  }

  create(): void {
    if (this.newPatient.value.firstName === '' || this.newPatient.value.lastName === '' ||
    this.newPatient.value.age === 0 || this.newPatient.value.sex === 0) {
      return;
    }

    const createPatient: Patient = {...this.newPatient.value};

    this.patientsService.addPatient(createPatient)
      .subscribe(patient => {
        this.patients.push(patient);
      });
  }
}
