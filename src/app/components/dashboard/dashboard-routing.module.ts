import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DoctordataComponent } from './doctordata/doctordata.component';
import { PatientdataComponent } from './patientdata/patientdata.component';
import { AppoinmentDataComponent } from './appoinment-data/appoinment-data.component';
import { ClinicsComponent } from './clinics/clinics.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'doctors', component: DoctordataComponent },
      { path: 'patients', component: PatientdataComponent },
      { path: 'appoinments', component: AppoinmentDataComponent },
      { path: 'clinics', component: ClinicsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
