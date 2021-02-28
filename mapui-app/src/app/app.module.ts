import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientThumbComponent } from './patient-thumb/patient-thumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { PatientFormComponent } from './patient-form/patient-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogPatientFormComponent} from './dialog-patient-form/dialog-patient-form.component';
import { DrugFormComponent } from './drug-form/drug-form.component';
import { DialogDrugFormComponent } from './dialog-drug-form/dialog-drug-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { DrugsListComponent } from './drugs-list/drugs-list.component';
import { DialogDrugsListComponent } from './dialog-drugs-list/dialog-drugs-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DialogDoctorFormComponent } from './dialog-doctor-form/dialog-doctor-form.component';
import { DoctorThumbComponent } from './doctor-thumb/doctor-thumb.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    PatientDetailComponent,
    PatientThumbComponent,
    PatientFormComponent,
    DialogPatientFormComponent,
    DrugFormComponent,
    DialogDrugFormComponent,
    DrugsListComponent,
    DialogDrugsListComponent,
    DoctorsListComponent,
    DoctorFormComponent,
    DialogDoctorFormComponent,
    DoctorThumbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
