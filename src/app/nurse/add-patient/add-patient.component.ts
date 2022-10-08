import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/services/loading.service';
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
    private loadingService: LoadingService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.newPatientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      appointmentType: new FormControl('appointment', Validators.required),
    });
  }

  ngOnInit(): void {}
  submit() {
    this.loadingService.isLoading.next(true);
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
              .addToWaitingList(
                res.data._id,
                this.newPatientForm.value.appointmentType
              )
              .subscribe((res) => {
                this.router.navigateByUrl('/nurse/home');
              });
            this.messageService.add({
              severity: 'success',
              summary: 'Added Successfully',
              detail: 'The patient has been added',
            });
          },
          error: (err) => {
            console.log(err);
            console.log(false);

            this.loadingService.isLoading.next(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Faild to add',
              detail: 'Check your internet and try again',
            });
          },
        });
      });
    } else {
      this.patientsService.getAllPatients().subscribe((res) => {
        let patientNumber = res.data.length;
        const patient = {
          ...this.newPatientForm.value,
          fileNo: '0' + (patientNumber + 1),
        };
        this.patientsService.addNewPatient(patient).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/nurse/home');
            this.messageService.add({
              severity: 'success',
              summary: 'Added Successfully',
              detail: 'The patient has been added',
            });
          },
          error: (err) => {
            console.log(err);
            console.log('falsed');
            this.loadingService.isLoading.next(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Faild to add',
              detail: 'Check your internet and try again',
            });
          },
        });
      });
    }
  }
}
