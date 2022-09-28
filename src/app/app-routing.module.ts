import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'nurse/signin',
    component: SigninComponent,
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'nurse',
    loadChildren: () =>
      import('./nurse/nurse.module').then((m) => m.NurseModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
