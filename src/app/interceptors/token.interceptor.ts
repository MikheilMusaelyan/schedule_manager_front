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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyODA4NTc4LCJpYXQiOjE2ODI4MDc2NzgsImp0aSI6ImQ1MjFhMDUyZjhkYjQ3NjQ5MTM3NzA5NmJlYjIxMmFlIiwidXNlcl9pZCI6MjJ9.wCUwi9NVsmQY1jq5bBd0LSqrqFCAvTTD3l3ySqHKS4I'
        }
      });
    }
    return next.handle(request);
  }
}