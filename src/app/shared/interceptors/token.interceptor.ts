import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('tokenObject'))?.token;
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNDMzNzA3LCJpYXQiOjE2ODM0MzI4MDcsImp0aSI6IjE3NzA2NTJkYzY3MTQ3ZTc5ZGRiYWE3ZTUxOTk0NmY2IiwidXNlcl9pZCI6MjJ9.WZNMtqy4g2LN1kAGaxQ-zOxYh3mX1Y6-nM88Fdh5bQc'
        }
      });
    }
    return next.handle(request);
  }
}