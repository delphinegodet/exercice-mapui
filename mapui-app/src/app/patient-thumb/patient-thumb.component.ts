import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../interfaces/Patient';

@Component({
  selector: 'app-patient-thumb',
  templateUrl: './patient-thumb.component.html',
  styleUrls: ['./patient-thumb.component.scss']
})

export class PatientThumbComponent {
  @Input() patient!: Patient;
}
