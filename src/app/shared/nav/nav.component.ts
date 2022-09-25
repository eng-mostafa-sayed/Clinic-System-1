import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
