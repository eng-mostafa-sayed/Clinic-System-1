import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  @Input() patientsData: Patient[] = [];
  @Input() patientsLength: number = 0;
  @Input() heading: string = '';
  constructor() {}

  ngOnInit(): void {}
  clickOnFilter(event: Event) {
    event.stopPropagation();
  }
}
