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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDcxODczLCJpYXQiOjE2ODMwNzA5NzMsImp0aSI6ImFjNzFjNDgxNWE3YjQ2NWQ4MDMzZjhjYWVhNGRlZjNiIiwidXNlcl9pZCI6MjJ9.dfk9fIEGPjQ9J5jfNJlMdopjPnM4DG_vZeLwvVR5JY8'
        }
      });
    }
    return next.handle(request);
  }
}