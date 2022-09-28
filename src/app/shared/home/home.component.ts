import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() type = '';
  treatedPatients: Patient[] = [];
  inqueuePatients: Patient[] = [];
  nextPatient: Patient = new Patient();
  treatedLength: number = 0;
  inqueuelength = 0;

  constructor(
    private patientsService: PatientsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.isLoading.next(true);
    this.patientsService.getTodayPatients().subscribe((res) => {
      this.treatedPatients = res.data;
      this.treatedLength = res.data.length;
    });
    this.patientsService.getWaitingList().subscribe((res) => {
      this.inqueuePatients = res.data;
      if (res.data.length > 0) {
        this.nextPatient = this.inqueuePatients.pop()!;
      }
      this.inqueuelength = res.data.length;
      this.loadingService.isLoading.next(false);
    });
  }
}
