import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('tokenObject'))?.token;
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyODExNzMzLCJpYXQiOjE2ODI4MTA4MzMsImp0aSI6IjdhOTZiMGU4N2JlZjRiMThiMjk2YTA3YmU4MDY1NDVkIiwidXNlcl9pZCI6MjJ9.yVJLEZJVPh6iGAh3hvQH_w-G1StVfgWY2fnnbEQ-JV4'
        }
      });
    }
    return next.handle(request);
  }
}