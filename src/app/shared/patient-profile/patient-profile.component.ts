import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  patientForm!: FormGroup;
  patientData = new Patient();
  selectedDrugType = 'drops';
  items: { id: number; selectedType: string; name: string }[] = [
    { id: 0, selectedType: 'drops', name: '' },
    { id: 1, selectedType: 'drops', name: '' },
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
    this.patientForm = new FormGroup({
      near: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      far: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      lt: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      rt: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RDsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LDsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RDcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LDcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RDaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LDaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RRsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LRsph: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RRcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LRcyl: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      RRaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      LRaxis: new FormControl({ value: null, disabled: this.type == 'nurse' }),
      notes: new FormControl({ value: null, disabled: this.type == 'nurse' }),
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
    console.log(this.patientForm);
    console.log(this.items);
  }
  printSigt() {
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
    this.items.push({ id: this.items.length, selectedType: 'drops', name: '' });
  }
}
