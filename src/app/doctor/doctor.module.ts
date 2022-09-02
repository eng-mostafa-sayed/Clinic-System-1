import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { PatientComponent } from './patient/patient.component';
import { SharedModule } from '../shared/shared.module';
import { DocHomeComponent } from './doc-home/doc-home.component';

@NgModule({
  declarations: [PatientComponent, DocHomeComponent],
  imports: [CommonModule, DoctorRoutingModule, SharedModule],
})
export class DoctorModule {}
