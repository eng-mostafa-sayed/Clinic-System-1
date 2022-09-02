import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { PatientsComponent } from './patients/patients.component';
import { BackComponent } from './back/back.component';

@NgModule({
  declarations: [PatientsComponent, BackComponent],
  imports: [TableModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [PatientsComponent, BackComponent],
})
export class SharedModule {}
