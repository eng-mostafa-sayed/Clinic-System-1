import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsHistoryComponent } from '../patients-history/patients-history.component';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { ManageDrugsComponent } from './manage-drugs/manage-drugs.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DocHomeComponent,
  },
  {
    path: 'drugs',
    component: ManageDrugsComponent,
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
export class DoctorRoutingModule {}
