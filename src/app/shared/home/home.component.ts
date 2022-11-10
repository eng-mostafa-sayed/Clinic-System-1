import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadingService.isLoading.next(true);
    this.patientsService.getTodayPatients().subscribe((res) => {
      this.treatedPatients = res.data;
      this.treatedLength = res.data.length;
    });
    this.patientsService.getWaitingList().subscribe((res) => {
      console.log(res);
      this.inqueuePatients = res.data;
      if (res.data.length > 0) {
        this.nextPatient = this.inqueuePatients.shift()!;
      }
      this.inqueuelength = res.data.length;
      this.loadingService.isLoading.next(false);
    });
  }
  CancelFromWaiting(patient: Patient) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to cancel this patient?',
      accept: () => {
        this.patientsService.cancelFromWaitingList(patient._id).subscribe({
          next: (res) => {
            if (patient._id === this.nextPatient._id) {
              if (this.inqueuePatients.length > 0) {
                this.nextPatient = this.inqueuePatients.shift()!;
                this.inqueuelength = this.inqueuePatients.length;
              } else {
                this.nextPatient = new Patient();
              }
            } else {
              this.inqueuePatients = this.inqueuePatients.filter((p) => {
                return p._id !== patient._id;
              });
              this.inqueuelength = this.inqueuePatients.length;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Canceled Successfully',
              detail: 'Patient has been canceled',
            });
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Faild to cancel',
              detail: 'Check your internet and try again',
            });
          },
        });
      },
    });
  }
}
