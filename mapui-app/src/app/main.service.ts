import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected apiUrl = 'http://localhost:3001';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Okay !', {
      duration: 5000,
    });
  }

  protected handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.openSnackBar(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
