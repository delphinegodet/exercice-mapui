import {Component, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {DrugsService} from '../drugs.service';
import {Drug} from '../interfaces/Drug';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  deleteDrug: EventEmitter<Drug>;
}

@Component({
  selector: 'app-dialog-drugs-list',
  templateUrl: './dialog-drugs-list.component.html',
  styleUrls: ['./dialog-drugs-list.component.scss']
})

export class DialogDrugsListComponent implements OnInit {
  drugs: Drug[];
  displayedColumns: string[] = ['name', 'code', 'actions'];
  dataSource: MatTableDataSource<Drug>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private drugsService: DrugsService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.drugs = [];
    this.dataSource = new MatTableDataSource<Drug>();
  }

  getDrugs(): void {
    this.drugsService.getDrugs().subscribe(drugs => {
      this.drugs = drugs;
      this.dataSource = new MatTableDataSource<Drug>(drugs);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
    });
  }

  ngOnInit(): void {
    this.getDrugs();
  }

  delete(drug: Drug): void {
    this.drugsService.deleteDrug(drug).subscribe(_ => {
      this.drugs = this.drugs.filter(d => d._id !== drug._id);
      this.dataSource = new MatTableDataSource<Drug>(this.drugs);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      this.data.deleteDrug.emit(drug);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
