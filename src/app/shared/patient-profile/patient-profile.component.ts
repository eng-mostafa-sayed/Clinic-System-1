import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  @Input() type = '';
  checkForm: FormGroup;
  patientData = new Patient();
  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.checkForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.patientsService.getPatient(param['id']).subscribe((res) => {
        this.patientData = res.data;
      });
    });
    // this.patientsService.getPatient();
  }
  submit() {}
  print() {
    window.print();
  }
  MakeAppint() {
    this.patientsService
      .addToWaitingList(this.patientData._id)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/nurse/home');
      });
  }
}
