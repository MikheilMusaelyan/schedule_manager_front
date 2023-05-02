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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyOTg0NTM0LCJpYXQiOjE2ODI5ODM2MzQsImp0aSI6IjI3ODY5OTRkMzRkMzQ1NzI5ZDhiNDM3OTI5YzM0YWNiIiwidXNlcl9pZCI6MjJ9.35-pxdK6daCHELFJ7lQh6ELehJkoBkplkgUKGMVkj24'
        }
      });
    }
    return next.handle(request);
  }
}