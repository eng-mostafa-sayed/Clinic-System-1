import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL = 'http://localhost:3000/api';
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
      .post<any>(`${this.rootURL}/${username}/login`, {
        name: username,
        password: password,
      })
      .subscribe({
        next: (res: any) => {
          this.token = res.data.token;
          sessionStorage.setItem('token', this.token);
          this.isAuthenticated = true;
          this.authStatusListener$.next(true);
          if (username == 'doctor') {
            this.router.navigate(['/doctor/patients']);
          } else {
            this.router.navigate(['/nurse/patients']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  autoAuth() {
    const token = sessionStorage.getItem('token');
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
    sessionStorage.removeItem('token');
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener$.next(false);
    this.router.navigate(['/doctor/signin']);
  }
}
