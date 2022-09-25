import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  username = '';
  constructor(
    private authService: AuthService,
    private activatedroute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe((data) => {
      this.username = data['username'];
    });
  }
  login() {
    this.authService.signin(this.username, this.loginForm.value.password);
  }
}
