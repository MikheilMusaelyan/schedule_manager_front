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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjYwNTgzLCJpYXQiOjE2ODMyNTk2ODMsImp0aSI6IjgwZTQ0YzYwZWI5NjQ2MzRhZGJlYTU5NTJlYmU3ZmM2IiwidXNlcl9pZCI6MjJ9.yIiAjkERehk1_TVJF46w-kdV3wxIamy4RXT084mUOVc'
        }
      });
    }
    return next.handle(request);
  }
}