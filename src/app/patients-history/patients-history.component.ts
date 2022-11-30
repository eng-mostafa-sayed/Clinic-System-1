import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { LoadingService } from '../services/loading.service';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-patients-history',
  templateUrl: './patients-history.component.html',
  styleUrls: ['./patients-history.component.scss'],
})
export class PatientsHistoryComponent implements OnInit {
  treatedPatients: Patient[] = [];
  treatedLength: number = 0;
  constructor(
    private patientsService: PatientsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.isLoading.next(true);
    this.patientsService.getAllPatients().subscribe((res) => {
      res.data.forEach((patient) => {
        patient.updatedAt = new Date(patient.updatedAt);
      });
      this.treatedPatients = res.data;
      this.treatedLength = this.treatedPatients.length;
      this.loadingService.isLoading.next(false);
    });
  }
}
