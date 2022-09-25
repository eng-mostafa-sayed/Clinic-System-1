import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
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

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getTodayPatients().subscribe((res) => {
      this.treatedPatients = res.data;
      this.treatedLength = res.data.length;
      console.log(res);
    });
    this.patientsService.getWaitingList().subscribe((res) => {
      this.inqueuePatients = res.data;
      if (res.data.length > 0) {
        this.nextPatient = this.inqueuePatients.pop()!;
      }
      this.inqueuelength = res.data.length;
      console.log(res.data);
    });
  }
}
