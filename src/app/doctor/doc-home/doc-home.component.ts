import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-doc-home',
  templateUrl: './doc-home.component.html',
  styleUrls: ['./doc-home.component.scss'],
})
export class DocHomeComponent implements OnInit {
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
