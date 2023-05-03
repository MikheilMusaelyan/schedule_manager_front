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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDg2MzEyLCJpYXQiOjE2ODMwODU0MTIsImp0aSI6ImZhNjAwNDc4ZmZiZDQ0Y2Y5Nzg1YWJiZjhjNGVhZjZlIiwidXNlcl9pZCI6MjJ9.mA84wbLhblV3CJQZS2rnM6ACFv5gPmK1-E05CK7Dj_k'
        }
      });
    }
    return next.handle(request);
  }
}