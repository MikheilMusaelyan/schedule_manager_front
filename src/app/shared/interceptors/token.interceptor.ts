import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('tokenObject'))?.token;
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNDEzMDE0LCJpYXQiOjE2ODM0MTIxMTQsImp0aSI6ImNiMjY2N2MyMzU5MTQzNTBiMDgxZmI2ZTUzMzMzNTUyIiwidXNlcl9pZCI6MjJ9.t5kEZ79ezDrceZ7Qmp2rWnXLvyHjj3g-UZoLSZlYWNI'
        }
      });
    }
    return next.handle(request);
  }
}