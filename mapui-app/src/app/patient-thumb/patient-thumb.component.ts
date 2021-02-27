import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Patient } from '../interfaces/Patient';
import {PatientsService} from '../patients.service';

@Component({
  selector: 'app-patient-thumb',
  templateUrl: './patient-thumb.component.html',
  styleUrls: ['./patient-thumb.component.scss']
})

export class PatientThumbComponent implements OnInit {
  @Input() patient!: Patient;
  @Output() deletePatient: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(private patientsService: PatientsService) {
  }

  delete(patient: Patient): void {
    this.patientsService.deletePatient(patient).subscribe(_ => {
      this.deletePatient.emit(patient);
    });
  }

  ngOnInit(): void {
  }
}
