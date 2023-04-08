import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links = [
    { label: 'a', active: false },
    { label: 'd', active: false },
    { label: 'calendar', active: false },
    { label: 'd', active: false },
  ];
}
