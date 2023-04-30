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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyODgwNDM0LCJpYXQiOjE2ODI4Nzk1MzQsImp0aSI6IjNkNzA4YWQ5NmNmODQ4OGZhMDBlOGI2NmJjMGU1NDljIiwidXNlcl9pZCI6MjJ9.G9RxwOlaL3q_tQStfYfVEtu_-LrTKUaqUR9nlBnyNLo'
        }
      });
    }
    return next.handle(request);
  }
}