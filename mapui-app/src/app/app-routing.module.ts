import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {DoctorsListComponent} from './doctors-list/doctors-list.component';

const routes: Routes = [
  { path: '', component: PatientsListComponent },
  { path: 'patients', redirectTo: '/', pathMatch: 'full' },
  { path: 'patients/:patientId', component: PatientDetailComponent },
  { path: 'doctors', component: DoctorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
