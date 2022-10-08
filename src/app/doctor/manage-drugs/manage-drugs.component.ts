import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Drug } from 'src/app/models/drug.model';
import { DrugsService } from 'src/app/services/drugs.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-drugs',
  templateUrl: './manage-drugs.component.html',
  styleUrls: ['./manage-drugs.component.scss'],
})
export class ManageDrugsComponent implements OnInit {
  drugs: Drug[] = [];
  drugForm: FormGroup;
  drugTypes: any = [];
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private drugsService: DrugsService,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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
    this.loadingService.isLoading.next(true);
    this.drugsService.addNewDrug(this.drugForm.value).subscribe({
      next: (res) => {
        this.loadingService.isLoading.next(false);
        this.drugs = [
          ...this.drugs,
          {
            name: this.drugForm.value.name,
            type: this.drugForm.value.type,
            createdAt: new Date(Date.now()),
          },
        ];
        window.location.reload();
      },
      error: (err) => {
        this.loadingService.isLoading.next(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Faild to save',
          detail: 'Check your internet and try again',
        });
      },
    });
  }
  onRowEditInit(drug: any) {
    console.log(drug);
  }
  onRowEditSave(drug: any) {
    this.loadingService.isLoading.next(true);
    this.drugsService
      .updateDrug(drug._id, {
        name: drug.name,
        type: drug.type,
      })
      .subscribe({
        next: (res) => {
          this.loadingService.isLoading.next(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Saved Successfully',
            detail: 'The drug data has been updated',
          });
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
  onRowEditCancel(drug: any, ri: any) {
    console.log(drug);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  confirm(drug: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.drugsService.deleteDrug(drug._id).subscribe({
          next: (res) => {
            this.loadingService.isLoading.next(false);
            this.drugs = this.drugs.filter((item) => {
              return item._id !== drug._id;
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted Successfully',
              detail: 'The drug has been deleted',
            });
          },
          error: (err) => {
            this.loadingService.isLoading.next(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Faild to delete',
              detail: 'Check your internet and try again',
            });
          },
        });
      },
    });
  }
}
