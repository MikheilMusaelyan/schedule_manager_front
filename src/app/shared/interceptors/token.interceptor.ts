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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDg5MzYyLCJpYXQiOjE2ODMwODg0NjIsImp0aSI6Ijk0OWI1MTcyYTMwNjRhZDY4ZmM2NmUxOGEwYWEwMDg3IiwidXNlcl9pZCI6MjJ9.yW24Fb3xyWE1wMeE5xNeX2MTl6XIxcNiTrxuShTU6Fw'
        }
      });
    }
    return next.handle(request);
  }
}