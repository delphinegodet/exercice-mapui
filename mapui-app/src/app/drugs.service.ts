import { Injectable } from '@angular/core';
import {Drug} from './interfaces/Drug';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Patient} from './interfaces/Patient';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DrugsService extends MainService {

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(`${this.apiUrl}/drugs`).pipe(
      tap(_ => this.openSnackBar('All drugs loaded')),
      catchError(this.handleError<Drug[]>('fetch all drugs', []))
    );
  }

  addDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>(`${this.apiUrl}/drugs`, drug, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Drug ${drug.name} created`)),
      catchError(this.handleError<Patient>(`add drug ${drug.name}`, undefined))
    );
  }

  deleteDrug(drug: Drug): Observable<Drug> {
    return this.http.delete<Drug>(`${this.apiUrl}/drugs/${drug._id}`).pipe(
      tap(_ => this.openSnackBar(`Drug ${drug.name} deleted`)),
      catchError(this.handleError<Patient>(`delete drug ${drug.name}`, undefined))
    );
  }
}
