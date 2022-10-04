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
  patientForm: FormGroup;
  patientData = new Patient();
  selectedDrugType = 'drops';
  items: { id: number; selectedType: string; name: string }[] = [
    { id: 0, selectedType: 'drops', name: '' },
    { id: 1, selectedType: 'drops', name: '' },
  ];
  drugs: Drug[] = [];
  drugTypes: any = [];
  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private drugsService: DrugsService
  ) {
    this.patientForm = new FormGroup({
      near: new FormControl(null),
      far: new FormControl(null),
      lt: new FormControl(null),
      rt: new FormControl(null),
      RDsph: new FormControl(null),
      LDsph: new FormControl(null),
      RDcyl: new FormControl(null),
      LDcyl: new FormControl(null),
      RDaxis: new FormControl(null),
      LDaxis: new FormControl(null),
      RRsph: new FormControl(null),
      LRsph: new FormControl(null),
      RRcyl: new FormControl(null),
      LRcyl: new FormControl(null),
      RRaxis: new FormControl(null),
      LRaxis: new FormControl(null),
      notes: new FormControl(null),
    });
  }

  ngOnInit(): void {
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
  addNewDrug() {
    this.items.push({ id: this.items.length, selectedType: 'drops', name: '' });
  }
}
