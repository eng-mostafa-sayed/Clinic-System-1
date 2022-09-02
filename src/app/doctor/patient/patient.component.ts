import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  checkForm: FormGroup;
  constructor() {
    this.checkForm = new FormGroup({});
  }

  ngOnInit(): void {}
  submit() {}
  print() {
    window.print();
  }
}
