import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Check } from 'src/app/models/check.model';
import { Drug } from 'src/app/models/drug.model';
import { Patient } from 'src/app/models/patient.model';
import { DrugsService } from 'src/app/services/drugs.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientsService } from 'src/app/services/patients.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  @Input() type = '';
  sightForm!: FormGroup;
  paitentDataForm!: FormGroup;
  checkNote!: string;
  diagnose!: string;
  patientData: Patient;
  selectedDrugType = 'drops';
  editMode = false;
  items = [
    {
      id: 0,
      selectedType: 'drops',
      name: '',
      noOfTakes: '',
      period: '',
      note: '',
    },
  ];
  drugs: Drug[] = [];
  drugTypes: any = [];
  isSight = true;
  showHistory = false;
  allChecks!: Check[];
  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private drugsService: DrugsService,
    private messageService: MessageService
  ) {
    this.patientData = new Patient();
  }

  ngOnInit(): void {
    this.sightForm = new FormGroup({
      near: new FormControl(null),
      far: new FormControl(null),
      lbcva: new FormControl(null),
      rbcva: new FormControl(null),
      rdsph: new FormControl(null),
      ldsph: new FormControl(null),
      rdcyl: new FormControl(null),
      ldcyl: new FormControl(null),
      rdaxis: new FormControl(null),
      ldaxis: new FormControl(null),
      rrsph: new FormControl(null),
      lrsph: new FormControl(null),
      rrcyl: new FormControl(null),
      lrcyl: new FormControl(null),
      rraxis: new FormControl(null),
      lraxis: new FormControl(null),
      note: new FormControl(null),
    });
    this.type === 'nurse' ? this.sightForm.disable() : this.sightForm.enable();

    this.paitentDataForm = new FormGroup({
      name: new FormControl(null),
      phoneNumber: new FormControl(null),
      age: new FormControl(null),
      gender: new FormControl(null),
      appointmentType: new FormControl(null),
    });

    this.loadingService.isLoading.next(true);
    this.drugsService.getAllDrugs().subscribe((res) => {
      this.drugs = res.data;
      this.drugTypes = [...new Set(this.drugs.map((drug) => drug.type))];
      this.loadingService.isLoading.next(false);
    });

    this.route.params.subscribe((param) => {
      this.patientsService.getPatient(param['id']).subscribe({
        next: (res) => {
          console.log(res);
          this.patientData = res.data;
          const note = res.data.visualAcuity.note;
          this.sightForm.setValue(res.data.visualAcuity);
          const { name, phoneNumber, age, gender, appointmentType } = res.data;
          this.paitentDataForm.setValue({
            name,
            phoneNumber,
            age,
            gender,
            appointmentType,
          });
          const last =
            res.data.allChecks.length === 0 ? 0 : res.data.allChecks.length - 1;
          this.items = [];
          if (res.data.allChecks.length > 0) {
            console.log(res.data.allChecks[last]);
            res.data.allChecks[last].treatments.forEach((treatment) => {
              const item = {
                id: this.items.length,
                selectedType: treatment.type,
                name: treatment.treatment,
                noOfTakes: treatment.noOfTakes,
                period: treatment.period,
                note: treatment.note,
              };
              this.items.push(item);
            });
            this.checkNote =
              res.data.allChecks[res.data.allChecks.length - 1].note;
            this.diagnose =
              res.data.allChecks[res.data.allChecks.length - 1].diagnosis;
            this.allChecks = res.data.allChecks;
          } else {
            const item = {
              id: this.items.length,
              selectedType: 'drops',
              name: '',
              noOfTakes: '',
              period: '',
              note: '',
            };
            this.items.push(item);
          }
          this.allChecks = res.data.allChecks;
          this.loadingService.isLoading.next(false);
        },
        error: (error) => {
          console.log(error);
          this.loadingService.isLoading.next(false);
        },
      });
    });
  }
  submit() {
    console.log(this.items);
  }
  addSight() {
    this.loadingService.isLoading.next(true);
    this.patientsService
      .addVisualAcuity(this.patientData._id, this.sightForm.value)
      .subscribe({
        next: (res) => {
          this.loadingService.isLoading.next(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Saved Successfully',
            detail: 'Visual Acuity has been updated',
          });
          this.patientData.visualAcuity.lbcva = this.sightForm.value.lbcva;
          this.patientData.visualAcuity.rbcva = this.sightForm.value.rbcva;
        },
        error: (err) => {
          this.loadingService.isLoading.next(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Faild to save',
            detail: 'Check your internet and try again',
          });
          console.log(err);
        },
      });
  }
  addCheck() {
    const check = new Check();
    check.treatments = [];
    this.items.forEach((item) => {
      check.treatments.push({
        treatment: item.name,
        period: item.period,
        noOfTakes: item.noOfTakes,
        note: item.note,
        type: item.selectedType,
      });
    });
    check.note = this.checkNote;
    check.diagnosis = this.diagnose;
    console.log(check, this.diagnose);
    this.patientsService.addCheck(this.patientData._id, check).subscribe({
      next: (res) => {
        this.loadingService.isLoading.next(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Saved Successfully',
          detail: 'Visual Acuity has been updated',
        });
      },
      error: (err) => {
        this.loadingService.isLoading.next(false);
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Faild to save',
          detail: 'Check your internet and try again',
        });
      },
    });
  }
  printSight() {
    this.isSight = true;
    setTimeout(() => {
      window.print();
    }, 10);
  }
  printMeds() {
    this.isSight = false;
    setTimeout(() => {
      window.print();
    }, 10);
  }

  MakeAppint() {
    this.patientsService
      .addToWaitingList(this.patientData._id, 'check up')
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/nurse/home');
          this.loadingService.isLoading.next(false);
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Appointment Made Successfully',
              detail: 'The patient got added to the waiting room',
            });
          }, 1000);
        },
        error: (err) => {
          this.loadingService.isLoading.next(false);
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Faild to add',
            detail: 'Check your internet and try again',
          });
        },
      });
  }
  MakeConsultation() {
    this.patientsService
      .addToWaitingList(this.patientData._id, 'consultation')
      .subscribe({
        next: (res) => {
          this.loadingService.isLoading.next(false);
          this.router.navigateByUrl('/nurse/home');
          this.messageService.add({
            severity: 'success',
            summary: 'Consultant Made Successfully',
            detail: 'The patient got added to the waiting room',
          });
        },
        error: (err) => {
          this.loadingService.isLoading.next(false);
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Faild to add',
            detail: 'Check your internet and try again',
          });
        },
      });
  }
  addNewDrug() {
    this.items.push({
      id: this.items.length,
      selectedType: 'drops',
      name: '',
      noOfTakes: '',
      period: '',
      note: '',
    });
  }
  removeDrug(drug: any) {
    this.items = this.items.filter((item) => {
      return item.id !== drug.id;
    });
    console.log(this.items);
  }
  removeFromWaiting() {
    this.loadingService.isLoading.next(true);
    this.patientsService.removeFromWaitingList(this.patientData._id).subscribe({
      next: (res) => {
        this.loadingService.isLoading.next(false);
        this.router.navigateByUrl('/doctor/home');
        this.messageService.add({
          severity: 'success',
          summary: 'Patient Marked Successfully',
          detail: 'The patient got added to the treated patients',
        });
      },
      error: (err) => {
        this.loadingService.isLoading.next(false);
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Faild to mark',
          detail: 'Check your internet and try again',
        });
      },
    });
  }
  saveData() {
    this.editMode = false;
    this.loadingService.isLoading.next(true);
    this.patientsService
      .updatePatientData(this.patientData._id, this.paitentDataForm.value)
      .subscribe({
        next: (res) => {
          this.loadingService.isLoading.next(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Patient Updated Successfully',
            detail: 'The patient data got updated',
          });
          this.patientData.name = this.paitentDataForm.value.name;
          this.patientData.age = this.paitentDataForm.value.age;
          this.patientData.phoneNumber = this.paitentDataForm.value.phoneNumber;
          this.patientData.gender = this.paitentDataForm.value.gender;
          this.patientData.appointmentType =
            this.paitentDataForm.value.appointmentType;
        },
        error: (err) => {
          this.loadingService.isLoading.next(false);
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Faild to update',
            detail: 'Check your internet and try again',
          });
        },
      });
  }
  editPaienttData() {
    this.editMode = true;
    const { name, phoneNumber, age, gender, appointmentType } =
      this.patientData;
    this.paitentDataForm.setValue({
      name,
      phoneNumber,
      age,
      gender,
      appointmentType,
    });
  }
  changeDir(e: any) {
    console.log(e.target);
    const pattern = /[\u0600-\u06FF]/;
    if (pattern.test(e.target.value)) {
      e.target.setAttribute('dir', 'rtl');
    } else {
      e.target.setAttribute('dir', 'ltr');
    }
  }
}
