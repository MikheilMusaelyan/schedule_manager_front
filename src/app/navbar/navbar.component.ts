import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  home = faUser

  links = [
    { label: 'main', icon: this.home },
    { label: 'singleday', icon: this.home },
    { label: 'login', icon: this.home },
  ];
  
}
