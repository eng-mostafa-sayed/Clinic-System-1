import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() Type = '';
  @Input() Header = '';
  @Input() Back = false;
  @Input() Route = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout(this.Type);
  }
}
