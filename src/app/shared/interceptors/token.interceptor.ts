import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { setMessage } from 'src/app/event/event.actions';
import { catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/login/login.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<any>,
    private router: Router
  ){}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const loginObject = JSON.parse(localStorage.getItem('schedule_login'));
    const accessToken = loginObject?.access;

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.store.dispatch(logout());
          this.store.dispatch(setMessage({message: 'Your session has expired'}))
          this.router.navigate(['login']);
        }
        return throwError(() => error);
      })
    );
  }
}