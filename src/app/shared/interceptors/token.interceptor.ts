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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMzI5OTgyLCJpYXQiOjE2ODMzMjkwODIsImp0aSI6ImE3NWQ2MjYwMjgyNjRmNGE5MWMxMGJiYmM5NzQ3Mjc0IiwidXNlcl9pZCI6MjJ9.wK3AbKRF7SMRIXezvVXip9_NH40qOvZtwfp1xpyT3-o'
        }
      });
    }
    return next.handle(request);
  }
}