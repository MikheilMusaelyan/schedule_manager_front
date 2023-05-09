import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Observable, map, tap } from 'rxjs'
import { AuthState } from '../login';
import { Store, select } from '@ngrx/store';
import { selectIsLoggedIn } from '../login/login.selectors';
import { faHome, faSignIn, faSignOut, faSun } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private store: Store<AuthState>,
    private authService: AuthService
  ){}

  isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn))
  
  home = faHome;
  logout = faSignOut
  login = faSignIn
  singleday = faSun

  links = [
    { label: 'main', icon: this.home },
    { label: 'singleday', icon: this.home },
    { label: 'login', icon: this.login },
  ];

  
  logOut(){
    this.authService.logout()
  }
  
}
