import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clinicWebsite';
  loading = false;
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.authService.autoAuth();
  }
}
