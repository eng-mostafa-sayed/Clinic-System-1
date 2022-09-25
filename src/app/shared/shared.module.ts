import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { PatientsComponent } from './patients/patients.component';
import { HomeComponent } from './home/home.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    PatientsComponent,
    HomeComponent,
    PatientProfileComponent,
    NavComponent,
  ],
  imports: [TableModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [
    PatientsComponent,
    HomeComponent,
    PatientProfileComponent,
    NavComponent,
  ],
})
export class SharedModule {}
