import {Injectable} from '@angular/core';
import {Patient} from './interfaces/Patient';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class PatientsService {
  private apiUrl = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(
      tap(_ => this.openSnackBar('All patients loaded')),
      catchError(this.handleError<Patient[]>('getPatients', []))
    );
  }

  getOnePatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`).pipe(
      tap(_ => this.openSnackBar('fetched one patient')),
      catchError(this.handleError<Patient>('getOnePatient', undefined))
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} created`)),
      catchError(this.handleError<Patient>(`add patient ${patient.firstName} ${patient.lastName}`))
    );
  }

  deletePatient(patient: Patient): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/patients/${patient._id}`).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} deleted`)),
      catchError(this.handleError<Patient>(`delete patient ${patient.firstName} ${patient.lastName}`))
    );
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${patient._id}`, patient, this.httpOptions).pipe(
      tap(_ => this.openSnackBar(`Patient ${patient.firstName} ${patient.lastName} updated`)),
      catchError(this.handleError<any>(`update patient ${patient.firstName} ${patient.lastName}`))
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Okay !', {
      duration: 2000,
    });
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.openSnackBar(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
