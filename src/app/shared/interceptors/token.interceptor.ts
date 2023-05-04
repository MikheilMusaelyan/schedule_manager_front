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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjMwMjg3LCJpYXQiOjE2ODMyMjkzODcsImp0aSI6ImNiZjFkNWNlY2Q2NzQwMjg4YWUzNTIyZmI1MzRiOGJjIiwidXNlcl9pZCI6MjJ9.K6Z3OLoMYgB_oLxwyPRUwJlYACpMI5p6T5W4TItyboI'
        }
      });
    }
    return next.handle(request);
  }
}