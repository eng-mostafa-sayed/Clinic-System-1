import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-patients-history',
  templateUrl: './patients-history.component.html',
  styleUrls: ['./patients-history.component.scss'],
})
export class PatientsHistoryComponent implements OnInit {
  treatedPatients: Patient[] = [];
  treatedLength: number = 0;
  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getAllPatients().subscribe((res) => {
      this.treatedPatients = res.data;
      this.treatedLength = this.treatedPatients.length;
      console.log(res);
    });
  }
}
