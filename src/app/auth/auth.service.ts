import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL1 = 'https://clinic-system.onrender.com/api';
  rootURL = 'https://essamkhedr.herokuapp.com/api';
  authStatusListener$ = new BehaviorSubject<boolean>(false);
  isAuthenticated = false;
  token: string = '';
  authorizationHeader = `bearer ${this.token}`;
  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  getToken() {
    return this.token;
  }
  getAuth() {
    return this.isAuthenticated;
  }

  signin(username: String, password: String) {
    this.http
      .post<any>(`${this.rootURL}/doctor/login`, {
        name: username,
        password: password,
      })
      .subscribe({
        next: (res: any) => {
          this.token = res.data.token;
          localStorage.setItem('token', this.token);
          this.isAuthenticated = true;
          this.authStatusListener$.next(true);
          this.loadingService.isLoading.next(false);
          if (username == 'doctor') {
            this.router.navigate(['/doctor/home']);
          } else {
            this.router.navigate(['/nurse/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.authStatusListener$.next(false);
          this.loadingService.isLoading.next(false);
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
  logout(type: string) {
    this.http.post<any>(`${this.rootURL}/doctor/login}`, {}).subscribe({
      next: () => {
        this.removeAuthData();
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        this.removeAuthData();
        this.router.navigate(['/signin']);
      },
    });
  }
  removeAuthData() {
    localStorage.removeItem('token');
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener$.next(false);
    this.router.navigate(['/signin']);
  }
}
