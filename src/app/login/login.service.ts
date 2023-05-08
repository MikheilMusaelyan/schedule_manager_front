import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, mapTo, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './login.actions';
import { AppState } from '../reducers';
import { Router } from '@angular/router';
import { setMessage } from '../event/event.actions';
import { actuallySelectDate } from '../calendar/calendar.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private http: HttpClient, 
        private store: Store<AppState>,
        private router: Router
    ) {}

    login(email: string, password: string, login: boolean): Observable<any> {
      return this.http.post(`http://127.0.0.1:8000/api/${login ? 'login': 'register'}/`, { 
        email: email,
        password: password
      })
      .pipe(
        tap((response) => {
          const loginObject = {
            access: response.access,
            access_expire: new Date().getTime() + (14 * 60 * 1000),
            refresh: response.refresh,
            refresh_expire: new Date().getTime() + (29 * 24 * 3600 * 1000),
          };
          localStorage.setItem("schedule_login", JSON.stringify(loginObject));
          this.store.dispatch(AuthActions.loginSuccess());
          this.store.dispatch(actuallySelectDate({date: new Date(), data: response['events']}))
        }, error => {
          this.store.dispatch(AuthActions.loginFailure());
        })
      );
    }

    logout(): void {
      this.store.dispatch(AuthActions.logout());
    }

    checkTokenValidityInit() {
      const loginInfo = JSON.parse(localStorage.getItem('schedule_login'));
      const currentTime = new Date().getTime();
    
      if (loginInfo?.refresh?.length > 1 && loginInfo?.refresh_expire > currentTime) {
        if (loginInfo?.access?.length > 1 && loginInfo.access_expire > currentTime) {
          // login immediately
          this.store.dispatch(AuthActions.loginSuccess());
          this.store.dispatch(setMessage({message: 'Logged in Successfuly!'}))
        } else {
          // get access token and login
          this.store.dispatch(setMessage({message: 'Logging in...'}))
        }
        this.refreshToken(loginInfo.refresh, true)
      } else {
        this.router.navigate(['login']);
      }
    }

    refreshToken(refresh: string, initial: boolean){
      this.http.post('http://127.0.0.1:8000/api/refresh/', {refresh: refresh})
      .subscribe((response: any) => {
        const loginObject = JSON.parse(localStorage.getItem('schedule_login'));
        if (loginObject) {
          loginObject.access = response.access;
          loginObject.access_expire = new Date().getTime() + (14 * 60 * 1000);
          localStorage.setItem('schedule_login', JSON.stringify(loginObject));
        } else {
          localStorage.setItem('schedule_login', JSON.stringify({
            access: response.access,
            access_expire: new Date().getTime() + (14 * 60 * 1000)
          }))
        }

        this.store.dispatch(AuthActions.loginSuccess());
        if(initial){
          this.router.navigate(['home'])
          this.store.dispatch(setMessage({message: 'Logged in Successfuly!'}))
        }
      }, (error: any) => {
        this.store.dispatch(AuthActions.loginFailure())
        this.router.navigate(['login']);
      }
    )
  }
  
}
