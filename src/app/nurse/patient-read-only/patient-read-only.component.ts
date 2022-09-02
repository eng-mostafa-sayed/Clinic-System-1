import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-read-only',
  templateUrl: './patient-read-only.component.html',
  styleUrls: ['./patient-read-only.component.scss'],
})
export class PatientReadOnlyComponent implements OnInit {
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
