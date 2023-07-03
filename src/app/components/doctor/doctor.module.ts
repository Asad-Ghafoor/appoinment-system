import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { HomeComponent } from './home/home.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HomeComponent,
    DoctorProfileComponent,
    NavbarComponent,
    AppoinmentsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ],
})
export class DoctorModule { }
