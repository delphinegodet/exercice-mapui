import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Drug} from '../interfaces/Drug';
import {DrugsService} from '../drugs.service';

const drugFormInit = new FormGroup({
  name: new FormControl('', Validators.required),
  code: new FormControl('', Validators.required)
});

@Component({
  selector: 'app-dialog-drug-form',
  templateUrl: './dialog-drug-form.component.html',
  styleUrls: ['./dialog-drug-form.component.scss']
})
export class DialogDrugFormComponent implements OnInit {

  drugForm = drugFormInit;

  constructor(private drugService: DrugsService) { }

  ngOnInit(): void {
  }

  validate(form: FormGroupDirective): void {
    if (this.drugForm.value.name === '' || this.drugForm.value.code === '') {
      return;
    }

    const drug: Drug = {...this.drugForm.value};

    this.drugService.addDrug(drug)
      .subscribe(_ => {
        form.resetForm();
      });
  }
}
