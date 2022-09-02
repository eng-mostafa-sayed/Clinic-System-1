import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import { SharedModule } from '../shared/shared.module';
import { PatientReadOnlyComponent } from './patient-read-only/patient-read-only.component';

@NgModule({
  declarations: [AddPatientComponent, NurseHomeComponent, PatientReadOnlyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    NurseRoutingModule,
    SharedModule,
  ],
})
export class NurseModule {}
