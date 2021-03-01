import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Patient} from '../interfaces/Patient';
import {PatientsService} from '../patients.service';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Drug} from '../interfaces/Drug';
import {DrugsService} from '../drugs.service';
import {MatSelectionList} from '@angular/material/list';

const patientFormInit = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  age: new FormControl(undefined, Validators.required),
  sex: new FormControl(undefined, Validators.required)
});

interface DialogData {
  create: boolean;
  currentPatient: Patient | undefined;
  addPatient: EventEmitter<Patient>;
  updatePatient: EventEmitter<Patient>;
}

@Component({
  selector: 'app-dialog-patient-form',
  templateUrl: 'dialog-patient-form.component.html',
  styleUrls: ['./dialog-patient-form.component.scss']
})


export class DialogPatientFormComponent implements OnInit {

  patientForm = patientFormInit;
  drugs: Drug[];
  selectedDrugs: string[];

  constructor(private patientsService: PatientsService,
              private drugsService: DrugsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.drugs = [];
    this.selectedDrugs = [];
  }

  getDrugs(): void {
    this.drugsService.getDrugs().subscribe(drugs => {
      this.drugs = drugs;
    });
  }

  ngOnInit(): void {
    this.getDrugs();
    if (this.data.currentPatient) {
      this.patientForm = new FormGroup({
        firstName: new FormControl(this.data.currentPatient.firstName, Validators.required),
        lastName: new FormControl(this.data.currentPatient.lastName, Validators.required),
        age: new FormControl(this.data.currentPatient.age, Validators.required),
        sex: new FormControl(this.data.currentPatient.sex, Validators.required)
      });
      this.selectedDrugs = this.data.currentPatient.drugs.map(d => d._id);
    }
  }

  selectDrugs(selection: MatSelectionList): void {
    this.selectedDrugs = selection.selectedOptions.selected.map(d => d.value);
  }

  validate(form: FormGroupDirective): void {
    if (this.patientForm.value.firstName === '' || this.patientForm.value.lastName === '' ||
      !this.patientForm.value.age || this.patientForm.value.age === 0 || !this.patientForm.value.sex) {
      return;
    }

    const patient: Patient = {...this.patientForm.value, drugs: this.selectedDrugs, treatments: []};

    if (this.data.create) {
      this.patientsService.addPatient(patient)
        .subscribe((p: Patient) => {
          this.data.addPatient.emit(p);
          form.resetForm();
        });
    } else {
      patient._id = this.data.currentPatient?._id as string;
      if (this.data.currentPatient) {
        patient.treatments = this.data.currentPatient.treatments;
      }
      this.patientsService.updatePatient(patient)
        .subscribe((p: Patient) => {
          this.data.updatePatient.emit(p);
        });
    }
  }
}
