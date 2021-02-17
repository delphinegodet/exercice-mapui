import {Injectable} from '@angular/core';
import {Patient} from './interfaces/Patient';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PatientsService {
  private apiUrl = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient, private messageService: MessageService) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`).pipe(
      tap(_ => this.log('fetched patients')),
      catchError(this.handleError<Patient[]>('getPatients', []))
    );
  }

  getOnePatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`).pipe(
      tap(_ => this.log('fetched one patient')),
      catchError(this.handleError<Patient>('getOnePatient', undefined))
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient, this.httpOptions).pipe(
      tap(_ => this.log(`added new patient`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${patient._id}`, patient, this.httpOptions).pipe(
      tap(_ => this.log(`updated patient`)),
      catchError(this.handleError<any>('updatePatient'))
    );
  }

  private log(message: string): void {
    this.messageService.add(`Patient Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
