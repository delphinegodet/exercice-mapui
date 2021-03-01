import { Component, OnInit } from '@angular/core';
import {Doctor} from '../interfaces/Doctor';
import {DoctorsService} from '../doctors.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})

export class DoctorsListComponent implements OnInit {
  doctors: Doctor[];

  constructor(private doctorsService: DoctorsService) {
    this.doctors = [];
  }

  getDoctors(): void {
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  addDoctor(doctor: Doctor): void {
    this.doctors.push(doctor);
  }

  updateDoctor(doctor: Doctor): void {
    this.doctors[this.doctors.findIndex(d => d._id === doctor._id)] = doctor;
  }

  deleteDoctor(doctor: Doctor): void {
    this.doctors = this.doctors.filter(d => d._id !== doctor._id);
  }

  ngOnInit(): void {
    this.getDoctors();
  }
}
