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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyODc1MzkwLCJpYXQiOjE2ODI4NzQ0OTAsImp0aSI6ImFiNGU2ZjgzZGMwYjRmY2E4ZGYwMzA0YTEyNDZjZTZiIiwidXNlcl9pZCI6MjJ9.q2f16_GcniXlJyF-Uf6cAOeP8FdwowYHJ5vItQm06ww'
        }
      });
    }
    return next.handle(request);
  }
}