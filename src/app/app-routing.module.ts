import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'nurse',
    loadChildren: () =>
      import('./nurse/nurse.module').then((m) => m.NurseModule),
  },
  {
    path: 'doctor/signin',
    component: SigninComponent,
    data: { username: 'doctor' },
  },
  {
    path: 'nurse/signin',
    component: SigninComponent,
    data: { username: 'nurse' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
