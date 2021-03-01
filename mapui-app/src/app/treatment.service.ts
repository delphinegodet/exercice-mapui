import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MainService} from './main.service';
import {Observable} from 'rxjs';
import {Patient} from './interfaces/Patient';
import {catchError, tap} from 'rxjs/operators';
import {Treatment} from './interfaces/Treatment';
import {Doctor} from './interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService extends MainService {

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  getTreatmentsByDoctor(doctor: Doctor): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}/treatments/doctor/${doctor._id}`).pipe(
      tap(_ => this.openSnackBar(`All treatments of doctor ${doctor.firstName} ${doctor.lastName} loaded`)),
      catchError(this.handleError<Patient[]>(`fetch all treatments of doctor ${doctor.firstName} ${doctor.lastName}`, []))
    );
  }

  addTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.apiUrl}/treatments`, treatment, this.httpOptions).pipe(
      tap(_ => this.openSnackBar('Treatment created')),
      catchError(this.handleError<Treatment>('add treatment', undefined))
    );
  }

  deleteTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.delete<Treatment>(`${this.apiUrl}/treatments/${treatment._id}`).pipe(
      tap(_ => this.openSnackBar('Treatment deleted')),
      catchError(this.handleError<Treatment>('delete treatment', undefined))
    );
  }

  updateTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.put<Treatment>(`${this.apiUrl}/treatments/${treatment._id}`, treatment, this.httpOptions).pipe(
      tap(_ => this.openSnackBar('Treatment updated')),
      catchError(this.handleError<any>('update treatment', undefined))
    );
  }
}
