import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}
  login() {
    this.authService.signin('Doctor', this.loginForm.value.password);
  }
}
