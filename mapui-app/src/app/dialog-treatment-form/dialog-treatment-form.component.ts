import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectionList} from '@angular/material/list';
import {Doctor} from '../interfaces/Doctor';
import {TreatmentService} from '../treatment.service';
import {DoctorsService} from '../doctors.service';
import {Treatment} from '../interfaces/Treatment';

const treatmentFormInit = new FormGroup({
  range: new FormGroup({
    start: new FormControl(undefined, Validators.required),
    end: new FormControl(undefined, Validators.required),
  }),
  text: new FormControl('', Validators.required)
});

interface DialogData {
  create: boolean;
  currentTreatment: Treatment | undefined;
  addTreatment: EventEmitter<Treatment>;
  updateTreatment: EventEmitter<Treatment>;
  patientId: string;
}

@Component({
  selector: 'app-dialog-treatment-form',
  templateUrl: './dialog-treatment-form.component.html',
  styleUrls: ['./dialog-treatment-form.component.scss']
})
export class DialogTreatmentFormComponent implements OnInit {

  treatmentForm = treatmentFormInit;
  doctors: Doctor[];
  selectedDoctor: string;

  constructor(private treatmentService: TreatmentService,
              private doctorService: DoctorsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.doctors = [];
    this.selectedDoctor = '';
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  ngOnInit(): void {
    this.getDoctors();
    if (this.data.currentTreatment) {
      this.treatmentForm = new FormGroup({
        range: new FormGroup({
          start: new FormControl(this.data.currentTreatment.start, Validators.required),
          end: new FormControl(this.data.currentTreatment.end, Validators.required),
        }),
        text: new FormControl(this.data.currentTreatment.text, Validators.required),
      });
      this.selectedDoctor = this.data.currentTreatment.doctor._id;
    }
  }

  selectDoctor(selection: MatSelectionList): void {
    this.selectedDoctor = selection.selectedOptions.selected[0].value;
  }

  validate(form: FormGroupDirective): void {
    if (!this.treatmentForm.value.range.start || !this.treatmentForm.value.range.end ||
       this.treatmentForm.value.text === '') {
      return;
    }

    const treatment = {
      ...this.treatmentForm.value,
      start: this.treatmentForm.value.range.start,
      end: this.treatmentForm.value.range.end,
      doctor: this.selectedDoctor,
      patientId: this.data.patientId
    };

    if (this.data.create) {
      this.treatmentService.addTreatment(treatment)
        .subscribe((t: Treatment) => {
          this.data.addTreatment.emit(t);
          form.resetForm();
        });
    } else {
      treatment._id = this.data.currentTreatment?._id as string;
      this.treatmentService.updateTreatment(treatment)
        .subscribe((t: Treatment) => {
          this.data.updateTreatment.emit(t);
        });
    }
  }
}
