import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('tokenObject'))?.token;
    console.log(123)
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNzk1NTk2LCJpYXQiOjE2ODI3OTQ2OTYsImp0aSI6IjFkNmFmZGRlYWU1NTRmZmNiOTFlOWVhNDM0NDdiMjgxIiwidXNlcl9pZCI6MjJ9.fijO5haTRGcJ2YIeFhviA_uTcSlpN6t4dHIzz_lHxHo'
        }
      });
    }
    return next.handle(request);
  }
}