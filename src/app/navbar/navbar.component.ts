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
    { label: 'calendar', icon: this.home },
    { label: 'singleday', icon: this.home },
    { label: 'a', icon: this.home },
    { label: 'b', icon: this.home },
  ];
  
}
