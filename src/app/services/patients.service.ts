import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private rootURL = 'https://clinic-system-production.up.railway.app/api';
  patients: Patient[] = [
    {
      patientID: '21654',
      name: 'mostafa',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: true,
    },
    {
      patientID: '21654',
      name: 'ahmed',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: true,
    },
    {
      patientID: '21654',
      name: 'ahmed',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: true,
    },
    {
      patientID: '21654',
      name: 'ahmed',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: false,
    },
    {
      patientID: '21654',
      name: 'ahmed',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: false,
    },
    {
      patientID: '21654',
      name: 'ahmed',
      age: 33,
      fileNumber: 11,
      phone: '01123648921',
      gender: 'Male',
      date: new Date(),
      status: false,
    },
  ];
  constructor(private http: HttpClient, private authService: AuthService) {}
  getPatients() {
    // return this.http.get<Patient[]>(`${this.rootURL}/doctor/getpatients`);
    return of(this.patients);
  }
  getPatient(id: string) {
    return this.http.get<Patient[]>(`${this.rootURL}/doctor/getpatients/${id}`);
  }
  addPatient(data: any) {
    return this.http.post<Patient[]>(`${this.rootURL}/patient/add`, {
      data,
    });
  }
}
