import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinicWebsite';
  data: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.autoAuth();
  }
}
