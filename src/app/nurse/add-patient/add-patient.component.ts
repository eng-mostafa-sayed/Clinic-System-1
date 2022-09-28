import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  doctorEassmId = '62ea88fa2fa75749254aa985';
  newPatientForm: FormGroup;
  isWaiting = true;
  constructor(
    private patientsService: PatientsService,
    private router: Router
  ) {
    this.newPatientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      // _id: new FormControl(this.doctorEassmId, Validators.required),
    });
  }

  ngOnInit(): void {}
  submit() {
    this.newPatientForm;
    if (this.isWaiting) {
      this.patientsService.getAllPatients().subscribe((res) => {
        let patientNumber = res.data.length;
        const patient = {
          ...this.newPatientForm.value,
          fileNo: '0' + (patientNumber + 1),
        };
        this.patientsService.addNewPatient(patient).subscribe({
          next: (res) => {
            this.patientsService
              .addToWaitingList(res.data._id)
              .subscribe((res) => {
                this.router.navigateByUrl('/nurse/home');
              });
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    } else {
    }
  }
}
