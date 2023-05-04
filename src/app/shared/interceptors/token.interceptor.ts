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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjE4ODg3LCJpYXQiOjE2ODMyMTc5ODcsImp0aSI6IjQyOWFhZTI4MDUwYjQ5ZjA4Njk1ZTQyN2QzMDkxZmMwIiwidXNlcl9pZCI6MjJ9.WYkLuRFPxwElS8M-dnAVaKeX0ynA4rCGQKR88ITtvTw'
        }
      });
    }
    return next.handle(request);
  }
}