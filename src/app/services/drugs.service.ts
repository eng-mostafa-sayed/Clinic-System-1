import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drug } from '../models/drug.model';

@Injectable({
  providedIn: 'root',
})
export class DrugsService {
  baseURL1 = 'https://clinic-system.onrender.com/api/drugs';
  baseURL = 'https://essamkhedr.herokuapp.com/api/drugs';
  constructor(private http: HttpClient) {}

  getAllDrugs() {
    return this.http.get<{ data: Drug[] }>(this.baseURL);
  }
  addNewDrug(drug: { name: string; type: string }) {
    return this.http.post<any>(this.baseURL, drug);
  }
  updateDrug(id: string, drug: { name: string; type: string }) {
    return this.http.put<any>(`${this.baseURL}/${id}`, drug);
  }
  deleteDrug(id: string) {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }
}
