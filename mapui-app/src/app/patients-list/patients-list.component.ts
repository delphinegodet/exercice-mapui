import { Component, OnInit } from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';
import {Drug} from "../interfaces/Drug";

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})

export class PatientsListComponent implements OnInit {
  patients: Patient[];

  constructor(private patientsService: PatientsService) {
    this.patients = [];
  }

  getPatients(): void {
    this.patientsService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  addPatient(patient: Patient): void {
    this.patients.push(patient);
  }

  deletePatient(patient: Patient): void {
    this.patients = this.patients.filter(p => p._id !== patient._id);
  }

  deleteDrug(drug: Drug): void {
    this.patients.forEach(p => {
      p.drugs = p.drugs.filter(d => d._id !== drug._id);
    });
  }

  ngOnInit(): void {
    this.getPatients();
  }
}
