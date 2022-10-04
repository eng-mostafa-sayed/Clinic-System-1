import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Drug } from 'src/app/models/drug.model';
import { DrugsService } from 'src/app/services/drugs.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-manage-drugs',
  templateUrl: './manage-drugs.component.html',
  styleUrls: ['./manage-drugs.component.scss'],
})
export class ManageDrugsComponent implements OnInit {
  drugs: Drug[] = [];
  drugForm: FormGroup;
  drugTypes: any = [];
  constructor(
    private drugsService: DrugsService,
    private loadingService: LoadingService
  ) {
    this.drugForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    // this.drugsService.getAllDrugs().subscribe((res) => {
    //   this.drugTypes = [...new Set(res.data.map((drug) => drug.type))];
    // });
    this.loadingService.isLoading.next(true);
    this.drugsService.getAllDrugs().subscribe((res) => {
      this.drugs = res.data;
      this.drugTypes = [...new Set(this.drugs.map((drug) => drug.type))];
      this.loadingService.isLoading.next(false);
    });
  }
  submit() {
    this.drugsService.addNewDrug(this.drugForm.value).subscribe((res) => {});
  }
  onRowEditInit(drug: any) {}
  onRowEditSave(drug: any) {}
  onRowEditCancel(drug: any, ri: any) {}
}
