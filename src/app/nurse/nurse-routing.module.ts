import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import { PatientReadOnlyComponent } from './patient-read-only/patient-read-only.component';

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
    component: PatientReadOnlyComponent,
  },
  {
    path: 'patients/:id',
    component: PatientReadOnlyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseRoutingModule {}
