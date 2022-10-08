import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import { SharedModule } from '../shared/shared.module';
import { PatientComponent } from './patient/patient.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AddPatientComponent, NurseHomeComponent, PatientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    NurseRoutingModule,
    SharedModule,
    FormsModule,
    ToastModule,
  ],
})
export class NurseModule {}
