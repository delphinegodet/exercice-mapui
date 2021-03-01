import {Component, OnInit} from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Treatment} from '../interfaces/Treatment';
import {TreatmentService} from "../treatment.service";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})

export class PatientDetailComponent implements OnInit {
  patient: Patient | undefined;

  constructor(private route: ActivatedRoute,
              private patientsService: PatientsService,
              private treatmentsService: TreatmentService,
              private location: Location) {
  }

  getPatient(): void {
    const id: string = this.route.snapshot.paramMap.get('patientId') || '';

    this.patientsService.getOnePatient(id).subscribe(patient => {
      patient.treatments =  patient.treatments.map(t => ({...t, start: new Date(t.start), end: new Date(t.end)}));

      this.patient = patient;
    });
  }

  updatePatient(p: Patient): void {
    p.treatments = p.treatments.map(t => ({...t, start: new Date(t.start), end: new Date(t.end)}));
    this.patient = p;
  }

  addTreatment(t: Treatment): void {
    this.patient?.treatments.push({...t, start: new Date(t.start), end: new Date(t.end)});
  }

  updateTreatment(t: Treatment): void {
    if (this.patient) {
      this.patient.treatments[this.patient.treatments.findIndex(treatment => treatment._id === t._id)] = t;
    }
  }

  delete(treatment: Treatment): void {
    if (this.patient) {
      this.treatmentsService.deleteTreatment(treatment).subscribe(t => {
        if (this.patient) {
          this.patient.treatments = this.patient?.treatments.filter(treat => treat._id !== t._id);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getPatient();
  }
}
