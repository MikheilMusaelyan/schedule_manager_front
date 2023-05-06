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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMzM3MTMwLCJpYXQiOjE2ODMzMzYyMzAsImp0aSI6IjU4MzdmNTlhMGE4ZDQ4MTBiNjMyZjZhNjI0MzhhMjcwIiwidXNlcl9pZCI6MjJ9.-ROAQi3hNGvpYracAXSql228ctt3c0me7_piA3InXjM'
        }
      });
    }
    return next.handle(request);
  }
}