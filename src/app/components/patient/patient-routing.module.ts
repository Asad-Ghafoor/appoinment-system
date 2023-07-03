import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorProfileComponent } from '../doctor/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: PatientProfileComponent },
  { path: 'appoinments', component: AppoinmentsComponent },
  // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
