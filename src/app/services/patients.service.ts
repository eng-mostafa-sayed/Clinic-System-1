import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Check } from '../models/check.model';
import { Patient } from '../models/patient.model';
import { Sight } from '../models/sight.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private rootURL = 'https://clinic-system-new.herokuapp.com/api';
  patients: Patient[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPatients() {
    return this.http.get<{ data: Patient[] }>(`${this.rootURL}/allpatients`);
  }
  getPatient(id: string) {
    return this.http.get<{ data: Patient }>(
      `${this.rootURL}/allpatients/${id}`
    );
  }
  getTodayPatients() {
    return this.http.get<{ data: Patient[] }>(
      `${this.rootURL}/allpatients/last`
    );
  }
  getWaitingList() {
    return this.http.get<{ data: Patient[] }>(
      `${this.rootURL}/allpatients/waiting`
    );
  }
  addToWaitingList(id: string, type: string) {
    return this.http.post(`${this.rootURL}/allpatients/waiting/${id}`, {
      appointmentType: type,
    });
  }
  removeFromWaitingList(id: string) {
    return this.http.delete(`${this.rootURL}/allpatients/waiting/${id}`);
  }
  addVisualAcuity(id: string, patientData: Sight) {
    return this.http.put(`${this.rootURL}/allpatients/v/${id}`, patientData);
  }
  addCheck(id: string, data: { check: Check }) {
    return this.http.put(`${this.rootURL}/allpatients/${id}`, data);
  }
  addNewPatient(data: any) {
    console.log(data);
    return this.http.post<any>(`${this.rootURL}/allpatients`, {
      name: data.name,
      age: data.age,
      phoneNumber: data.phoneNumber,
      fileNo: data.fileNo,
      gender: data.gender,
    });
  }
  deletePatient(data: any) {
    return this.http.delete(`${this.rootURL}/allpatients`);
  }
  forgetPassword(username: string, password: string) {
    return this.http.post<any>(`${this.rootURL}/doctor/forgetpassword`, {
      name: username,
      password: password,
    });
  }
}
