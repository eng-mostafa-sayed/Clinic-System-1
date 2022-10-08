import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Check } from 'src/app/models/check.model';
import { Drug } from 'src/app/models/drug.model';
import { Patient } from 'src/app/models/patient.model';
import { DrugsService } from 'src/app/services/drugs.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  @Input() type = '';
  sightForm!: FormGroup;
  checkNote!: string;
  patientData = new Patient();
  selectedDrugType = 'drops';
  items = [
    { id: 0, selectedType: 'drops', name: '', noOfTakes: '', period: '' },
    { id: 1, selectedType: 'drops', name: '', noOfTakes: '', period: '' },
  ];
  drugs: Drug[] = [];
  drugTypes: any = [];
  isSight = true;
  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private drugsService: DrugsService
  ) {}

  ngOnInit(): void {
    this.sightForm = new FormGroup({
      near: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      far: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      lbcva: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rbcva: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rdsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      ldsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rdcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      ldcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rdaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      ldaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rrsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      lrsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rrcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      lrcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rraxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      lraxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      note: new FormControl({ value: null, disabled: this.type == 'nurse' }),
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
          this.sightForm.setValue(res.data.visualAcuity);
          this.items = [];
          res.data.allChecks[
            res.data.allChecks.length - 1
          ].check.treatments.forEach((check) => {
            const item = {
              id: this.items.length,
              selectedType: 'drops',
              name: check.treatment,
              noOfTakes: check.noOfTakes,
              period: check.period,
            };
            this.items.push(item);
          });
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
    this.patientsService
      .addVisualAcuity(this.patientData._id, this.sightForm.value)
      .subscribe((res) => {});
  }
  addCheck() {
    const check = new Check();
    check.treatments = [];
    this.items.forEach((item) => {
      check.treatments.push({
        treatment: item.name,
        period: item.period,
        noOfTakes: item.noOfTakes,
      });
    });
    check.note = this.checkNote;
    this.patientsService
      .addCheck(this.patientData._id, { check })
      .subscribe((res) => {});
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
      .addToWaitingList(this.patientData._id)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/nurse/home');
      });
  }
  addNewDrug() {
    this.items.push({
      id: this.items.length,
      selectedType: 'drops',
      name: '',
      noOfTakes: '',
      period: '',
    });
  }
}
