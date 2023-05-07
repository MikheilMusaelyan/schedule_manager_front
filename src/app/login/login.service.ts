import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './login.actions';
import { AppState } from '../reducers';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(
        private http: HttpClient, 
        private store: Store<AppState>
    ) {}

    private refreshTokenInterval: any;

    login(email: string, password: string): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/login/', { 
        email: email,
        password: password
      })
      .pipe(
        tap((response) => {
          const loginObject = {
            access: response.access,
            refresh: response.refresh
          };
          localStorage.setItem("schedule_login", JSON.stringify(loginObject));
          this.store.dispatch(AuthActions.loginSuccess());
        }, error => {
          this.store.dispatch(AuthActions.loginFailure({ error: error }));
        })
      );
    }

    register(email: string, password: string): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/login/', { 
        email: email,
        password: password
      })
      .pipe(
        tap((response) => {
          const loginObject = {
            access: response.access,
            refresh: response.refresh
          };
          localStorage.setItem("schedule_login", JSON.stringify(loginObject));
          this.store.dispatch(AuthActions.loginSuccess());
        }, error => {
          this.store.dispatch(AuthActions.loginFailure({ error: error }));
        })
      );
    }

    logout(): void {
      this.store.dispatch(AuthActions.logout());
    }

    startTokenRefresh(): void {
      this.refreshTokenInterval = setInterval(() => {
        this.store.dispatch(AuthActions.refreshToken());
      }, 14 * 60 * 1000);
    }
    
    stopTokenRefresh(): void {
      clearInterval(this.refreshTokenInterval);
    }
  
}
