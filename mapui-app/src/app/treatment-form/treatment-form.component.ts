import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Treatment} from '../interfaces/Treatment';
import {DialogTreatmentFormComponent} from '../dialog-treatment-form/dialog-treatment-form.component';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.scss']
})

export class TreatmentFormComponent {

  @Input() create = true;
  @Input() patientId = '';
  @Input() currentTreatment: Treatment | undefined;
  @Output() addTreatment: EventEmitter<Treatment> = new EventEmitter<Treatment>();
  @Output() updateTreatment: EventEmitter<Treatment> = new EventEmitter<Treatment>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(DialogTreatmentFormComponent,  {
      data: {
        create: this.create,
        currentTreatment: this.currentTreatment,
        addTreatment: this.addTreatment,
        updateTreatment: this.updateTreatment,
        patientId: this.patientId
      }
    });
  }
}
