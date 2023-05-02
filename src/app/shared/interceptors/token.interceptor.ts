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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyOTkzMDEwLCJpYXQiOjE2ODI5OTIxMTAsImp0aSI6IjA4MWVjZGFjY2IxYzQ3NDBiMDFkZWEzZmY5ZWFiYTkzIiwidXNlcl9pZCI6MjJ9.qFf26iIOG8GmEKExuXsI4hL9U2yZPzonFh4_iHc4hOA'
        }
      });
    }
    return next.handle(request);
  }
}