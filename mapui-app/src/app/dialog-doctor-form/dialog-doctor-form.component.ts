import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Doctor} from '../interfaces/Doctor';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {DoctorsService} from '../doctors.service';

const doctorFormInit = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  speciality: new FormControl('', Validators.required),
});

interface DialogData {
  create: boolean;
  currentDoctor: Doctor | undefined;
  addDoctor: EventEmitter<Doctor>;
  updateDoctor: EventEmitter<Doctor>;
}

@Component({
  selector: 'app-dialog-doctor-form',
  templateUrl: './dialog-doctor-form.component.html',
  styleUrls: ['./dialog-doctor-form.component.scss']
})
export class DialogDoctorFormComponent implements OnInit {

  doctorForm = doctorFormInit;

  constructor(private doctorsService: DoctorsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    if (this.data.currentDoctor) {
      this.doctorForm = new FormGroup({
        firstName: new FormControl(this.data.currentDoctor.firstName, Validators.required),
        lastName: new FormControl(this.data.currentDoctor.lastName, Validators.required),
        speciality: new FormControl(this.data.currentDoctor.speciality, Validators.required),
      });
    }
  }

  validate(form: FormGroupDirective): void {
    if (this.doctorForm.value.firstName === '' || this.doctorForm.value.lastName === '' ||
      this.doctorForm.value.speciality === '') {
      return;
    }

    const doctor: Doctor = {...this.doctorForm.value };

    if (this.data.create) {
      this.doctorsService.addDoctor(doctor)
        .subscribe((p: Doctor) => {
          this.data.addDoctor.emit(p);
          form.resetForm();
        });
    } else {
      doctor._id = this.data.currentDoctor?._id as string;
      this.doctorsService.updateDoctor(doctor)
        .subscribe((p: Doctor) => {
          this.data.updateDoctor.emit(p);
        });
    }
  }
}
