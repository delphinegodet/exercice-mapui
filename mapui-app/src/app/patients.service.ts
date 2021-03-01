import {Injectable} from '@angular/core';
import {Patient} from './interfaces/Patient';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MainService} from './main.service';
import {Doctor} from "./interfaces/Doctor";
import {Treatment} from "./interfaces/Treatment";

@Injectable({
  providedIn: 'root'
})

export class PatientsService extends MainService  {

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(
      tap(_ => this.openSnackBar('All patients loaded')),
      catchError(this.handleError<Patient[]>('fetch all patients', []))
    );
  }

  getOnePatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`).pipe(
      tap(patient => this.openSnackBar(`Infos of patient ${patient.firstName} ${patient.lastName} loaded`)),
      catchError(this.handleError<Patient>(`fetch one patient`, undefined))
    );
  }

  getPatientsByDoctor(doctor: Doctor): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients/doctor/${doctor._id}`).pipe(
      tap(_ => this.openSnackBar(`All patients of doctor ${doctor.firstName} ${doctor.lastName} loaded`)),
      catchError(this.handleError<Patient[]>(`fetch all patients of doctor ${doctor.firstName} ${doctor.lastName}`, []))
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} created`)),
      catchError(this.handleError<Patient>(`add patient ${patient.firstName} ${patient.lastName}`, undefined))
    );
  }

  deletePatient(patient: Patient): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient._id}`).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} deleted`)),
      catchError(this.handleError<Patient>(`delete patient ${patient.firstName} ${patient.lastName}`, undefined))
    );
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patient._id}`, patient, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} updated`)),
      catchError(this.handleError<any>(`update patient ${patient.firstName} ${patient.lastName}`, undefined))
    );
  }
}
