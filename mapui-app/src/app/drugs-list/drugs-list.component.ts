import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogDrugsListComponent} from '../dialog-drugs-list/dialog-drugs-list.component';
import {Drug} from '../interfaces/Drug';

@Component({
  selector: 'app-drugs-list',
  templateUrl: './drugs-list.component.html',
  styleUrls: ['./drugs-list.component.scss']
})
export class DrugsListComponent {

  @Output() deleteDrug: EventEmitter<Drug> = new EventEmitter<Drug>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(DialogDrugsListComponent, {
      data: {
        deleteDrug: this.deleteDrug
      }
    });
  }
}
