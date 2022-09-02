import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full',
  },
  {
    path: 'patients',
    component: DocHomeComponent,
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
