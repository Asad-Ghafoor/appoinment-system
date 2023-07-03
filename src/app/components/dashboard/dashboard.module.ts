import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DoctordataComponent } from './doctordata/doctordata.component';
import { PatientdataComponent } from './patientdata/patientdata.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppoinmentDataComponent } from './appoinment-data/appoinment-data.component';
import { ClinicsComponent } from './clinics/clinics.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminProfileComponent,
    DoctordataComponent,
    PatientdataComponent,
    AppoinmentDataComponent,
    ClinicsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    RouterModule,
  ]
})
export class DashboardModule {
  constructor() { }
}
