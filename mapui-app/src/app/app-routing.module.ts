import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {DoctorsComponent} from './doctors/doctors.component';

const routes: Routes = [
  { path: '', component: PatientsListComponent },
  { path: 'patients', redirectTo: '/', pathMatch: 'full' },
  { path: 'patients/:patientId', component: PatientDetailComponent },
  { path: 'doctors', component: DoctorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
