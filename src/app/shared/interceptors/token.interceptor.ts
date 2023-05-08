import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const loginObject = JSON.parse(localStorage.getItem('schedule_login'));
    const accessToken = loginObject?.access;
    const refreshToken = loginObject?.refresh;

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  
    return next.handle(request);
  }

 
  // ngOnInit() {
  //   const token = JSON.parse(localStorage.getItem('schedule_login'))?.access;
    
  //   if (token && this.tokenExpired(token)) {
  //     // Token expired
  //   } else {
  //     // Token valid or not present
  //   }
  // }
}