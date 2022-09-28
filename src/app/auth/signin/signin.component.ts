import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.loginForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      username: new FormControl('doctor', Validators.required),
    });
  }

  ngOnInit(): void {}
  login() {
    console.log(this.loginForm.value);
    this.loadingService.isLoading.next(true);
    this.authService.signin(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}
