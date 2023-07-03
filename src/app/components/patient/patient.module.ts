import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';

@NgModule({
  declarations: [
    HomeComponent,
    PatientProfileComponent,
    NavbarComponent,
    AppoinmentsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule
  ]
})
export class PatientModule { }
