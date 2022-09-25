import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  doctorEassmId = '62ea88fa2fa75749254aa985';
  newPatientForm: FormGroup;
  constructor(private patientsService: PatientsService) {
    this.newPatientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      _id: new FormControl(this.doctorEassmId, Validators.required),
    });
  }

  ngOnInit(): void {}
  submit() {
    console.log(this.newPatientForm);
    this.newPatientForm;
    this.patientsService.addNewPatient(this.newPatientForm.value).subscribe();
  }
}
