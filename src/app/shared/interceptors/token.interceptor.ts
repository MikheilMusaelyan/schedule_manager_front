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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyOTg2MTQ3LCJpYXQiOjE2ODI5ODUyNDcsImp0aSI6ImExMjBlN2NhZmViMDQwZmVhZDc2OTIwNzRkNTZhMDMyIiwidXNlcl9pZCI6MjJ9.tsn-NeRDsC3hd8rNb6zUVR8FqP_LfCosqQxrjSdVbFs'
        }
      });
    }
    return next.handle(request);
  }
}