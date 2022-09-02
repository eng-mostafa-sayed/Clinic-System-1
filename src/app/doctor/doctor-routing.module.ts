import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocHomeComponent } from './doc-home/doc-home.component';
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
    path: 'patients',
    component: PatientComponent,
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
