import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL = 'https://clinic-system-new.herokuapp.com/api';
  authStatusListener$ = new BehaviorSubject<boolean>(false);
  isAuthenticated = false;
  token: string = 'dasdasd';
  authorizationHeader = `bearer ${this.token}`;
  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return this.token;
  }
  getAuth() {
    return this.isAuthenticated;
  }

  signin(username: String, password: String) {
    this.http
      .post<any>(`${this.rootURL}/doctor/login`, {
        name: 'doctor',
        password: password,
      })
      .subscribe({
        next: (res: any) => {
          this.token = res.data.token;
          localStorage.setItem('token', this.token);
          this.isAuthenticated = true;
          this.authStatusListener$.next(true);
          if (username == 'doctor') {
            this.router.navigate(['/doctor/home']);
          } else {
            this.router.navigate(['/nurse/home']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  autoAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener$.next(true);
  }
  logout() {
    this.http.post<any>(`${this.rootURL}/doctor/login}`, {}).subscribe({
      next: () => {
        this.removeAuthData();
      },
      error: (err) => {
        this.removeAuthData();
      },
    });
  }
  removeAuthData() {
    localStorage.removeItem('token');
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener$.next(false);
    this.router.navigate(['/doctor/signin']);
  }
}
