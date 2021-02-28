import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Patient} from './interfaces/Patient';
import {catchError, tap} from 'rxjs/operators';
import {Doctor} from './interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService extends MainService {

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`).pipe(
      tap(_ => this.openSnackBar('All doctors loaded')),
      catchError(this.handleError<Patient[]>('fetch all doctors', []))
    );
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/doctors`, doctor, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Doctor ${doctor.firstName} ${doctor.lastName} created`)),
      catchError(this.handleError<Patient>(`add doctor ${doctor.firstName} ${doctor.lastName}`, undefined))
    );
  }

  deleteDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/doctors/${doctor._id}`).pipe(
      tap(_ => this.openSnackBar(`Patient ${doctor.firstName} ${doctor.lastName} deleted`)),
      catchError(this.handleError<Patient>(`delete doctor ${doctor.firstName} ${doctor.lastName}`, undefined))
    );
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctors/${doctor._id}`, doctor, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Doctor ${doctor.firstName} ${doctor.lastName} updated`)),
      catchError(this.handleError<any>(`update doctor ${doctor.firstName} ${doctor.lastName}`, undefined))
    );
  }
}
