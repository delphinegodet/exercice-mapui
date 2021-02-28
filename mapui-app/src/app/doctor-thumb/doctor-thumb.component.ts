import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from '../interfaces/Doctor';
import {DoctorsService} from '../doctors.service';

@Component({
  selector: 'app-doctor-thumb',
  templateUrl: './doctor-thumb.component.html',
  styleUrls: ['./doctor-thumb.component.scss']
})
export class DoctorThumbComponent implements OnInit {

  @Input() doctor!: Doctor;
  @Output() deleteDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() updateDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(private doctorsService: DoctorsService) {
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
  }

}
