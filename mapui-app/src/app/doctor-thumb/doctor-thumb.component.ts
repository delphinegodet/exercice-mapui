import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from '../interfaces/Doctor';
import {DoctorsService} from '../doctors.service';
import {Treatment} from '../interfaces/Treatment';
import {TreatmentService} from '../treatment.service';
import {Patient} from "../interfaces/Patient";
import {PatientsService} from "../patients.service";

@Component({
  selector: 'app-doctor-thumb',
  templateUrl: './doctor-thumb.component.html',
  styleUrls: ['./doctor-thumb.component.scss']
})

export class DoctorThumbComponent implements OnInit {
  treatments: Treatment[];
  patients: Patient[];

  @Input() doctor!: Doctor;
  @Output() deleteDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() updateDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(private doctorsService: DoctorsService,
              private treatmentsService: TreatmentService,
              private patientService: PatientsService) {
    this.treatments = [];
    this.patients = [];
  }

  getTreatments(): void {
    this.treatmentsService.getTreatmentsByDoctor(this.doctor).subscribe(treatments => {
      treatments.forEach(t => {
        t.start = new Date(t.start);
        t.end = new Date(t.end);
      });
      this.treatments = treatments;
    });
  }

  getPatients(): void {
    this.patientService.getPatientsByDoctor(this.doctor).subscribe(patients => {
      this.patients = patients;
      console.log(patients);
    });
  }

  delete(doctor: Doctor): void {
    this.doctorsService.deleteDoctor(doctor).subscribe(_ => {
      this.deleteDoctor.emit(doctor);
    });
  }

  update(doctor: Doctor): void {
    this.doctorsService.updateDoctor(doctor).subscribe(_ => {
      this.updateDoctor.emit(doctor);
    });
  }

  ngOnInit(): void {
    this.getTreatments();
    this.getPatients();
  }

}
