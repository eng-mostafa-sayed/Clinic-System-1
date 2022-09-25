import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsHistoryComponent } from '../patients-history/patients-history.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: NurseHomeComponent,
  },
  {
    path: 'add',
    component: AddPatientComponent,
  },
  {
    path: 'patients',
    component: PatientsHistoryComponent,
  },
  {
    path: 'patients/:id',
    component: PatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseRoutingModule {}
