import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { PatientComponent } from './patient/patient.component';
import { SharedModule } from '../shared/shared.module';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { ManageDrugsComponent } from './manage-drugs/manage-drugs.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [PatientComponent, DocHomeComponent, ManageDrugsComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class DoctorModule {}
