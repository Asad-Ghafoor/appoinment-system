import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { DashboardModule } from '../dashboard/dashboard.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardModule
  ],
  exports: [ProfileComponent]
})
export class SharedModule { }
