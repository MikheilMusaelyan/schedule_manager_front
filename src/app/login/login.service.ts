import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './login.actions';
import { AppState } from '../reducers';
import { Router } from '@angular/router';
import { EventFailure, eventsLoading, getEvents, setMessage } from '../event/event.actions';
import { actuallySelectDate } from '../calendar/calendar.actions';
import { NodesService } from '../shared/nodes';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private http: HttpClient, 
        private store: Store<AppState>,
        private router: Router,
        private nodes: NodesService
    ) {}

    login(email: string, password: string, login: boolean){
      this.http.post(`https://drfscheduler.up.railway.app/api/${login ? 'login': 'signup'}/`, { 
        email: email,
        password: password
      })
      .subscribe((response: any) => {
          this.store.dispatch(eventsLoading({bool: false}))
          const loginObject = {
            access: response.access,
            access_expire: new Date().getTime() + (60 * 60 * 1000),
            refresh: response.refresh,
            refresh_expire: new Date().getTime() + (29 * 24 * 3600 * 1000),
          };
          localStorage.setItem("schedule_login", JSON.stringify(loginObject));
          this.router.navigate([''])
          this.store.dispatch(AuthActions.loginSuccess());
          if(response['events'][`d${new Date().getDate()}`]){
            this.nodes.setDay(response['events'][`d${new Date().getDate()}`])
          }
          this.store.dispatch(actuallySelectDate({date: new Date(), data: response['events'], upcoming: response['upcoming']}))
          this.store.dispatch(setMessage({message: 'Logged in Successfuly!'}))
        }, error => {
          this.store.dispatch(eventsLoading({bool: false}))
          this.store.dispatch(EventFailure());
          this.store.dispatch(AuthActions.loginFailure());
        })
    }

    logout(): void {
      localStorage.setItem('schedule_login', JSON.stringify({}))
      this.store.dispatch(AuthActions.logout());
    }

    checkTokenValidityInit() {
      const loginInfo = JSON.parse(localStorage.getItem('schedule_login'));
      const currentTime = new Date().getTime();
      
      if (loginInfo?.refresh?.length > 1 && loginInfo?.refresh_expire > currentTime) {
        if (loginInfo?.access?.length > 1 && loginInfo.access_expire > currentTime) {
          this.store.dispatch(getEvents({date: new Date()}))
          this.store.dispatch(AuthActions.loginSuccess());
          this.store.dispatch(setMessage({message: 'Logged in Successfuly!'}))
          return
        }
        this.refreshToken(loginInfo.refresh, true)
      } else {
        this.store.dispatch(AuthActions.loginFailure())
        this.router.navigate(['login']);
      }
    }

    refreshToken(refresh: string, initial: boolean){
      this.http.post('https://drfscheduler.up.railway.app/api/refresh/', {refresh: refresh})
      .subscribe((response: any) => {
        const loginObject = JSON.parse(localStorage.getItem('schedule_login'));
        if (loginObject) {
          loginObject.access = response.access;
          loginObject.access_expire = new Date().getTime() + (60 * 60 * 1000);
          localStorage.setItem('schedule_login', JSON.stringify(loginObject));
        } else {
          localStorage.setItem('schedule_login', JSON.stringify({
            access: response.access,
            access_expire: new Date().getTime() + (60 * 60 * 1000)
          }))
        }

        this.store.dispatch(AuthActions.loginSuccess());
        if(initial){
          this.router.navigate([''])
          this.store.dispatch(setMessage({message: 'Logged in Successfuly!'}))
        }
      }, (error: any) => {
        this.store.dispatch(AuthActions.loginFailure())
        this.router.navigate(['login']);
      }
    )
  }
  
}
