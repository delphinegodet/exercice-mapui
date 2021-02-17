import { Component, OnInit } from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | undefined;

  constructor(private route: ActivatedRoute, private patientsService: PatientsService, private location: Location) {
  }

  getPatient(): void {
    const id: string = this.route.snapshot.paramMap.get('patientId') || '';

    this.patientsService.getOnePatient(id).subscribe(patient => this.patient = patient);
  }

  save(): void {
    if (this.patient) {
      this.patientsService.updatePatient(this.patient)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getPatient();
  }
}
