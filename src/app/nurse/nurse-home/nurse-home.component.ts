import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-nurse-home',
  templateUrl: './nurse-home.component.html',
  styleUrls: ['./nurse-home.component.scss'],
})
export class NurseHomeComponent implements OnInit {
  treatedPatients: Patient[] = [];
  inqueuePatients: Patient[] = [];
  nextPatient: Patient = new Patient();
  treatedLength: number = 0;
  inqueuelength = 0;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe((patients) => {
      patients.filter((patient) => {
        if (!patient.status) {
          this.inqueuePatients.push(patient);
        } else {
          this.treatedPatients.push(patient);
        }
      });
      this.nextPatient = this.inqueuePatients.pop()!;
      this.treatedLength = this.treatedPatients.length;
      this.inqueuelength = this.inqueuePatients.length;
      console.log(this.nextPatient);
    });
  }
}
