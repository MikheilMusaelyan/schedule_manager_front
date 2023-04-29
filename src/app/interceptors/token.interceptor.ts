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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNzk2ODExLCJpYXQiOjE2ODI3OTU5MTEsImp0aSI6IjgwNmIzOTNkOTU0MzRkNjU5ZDVkOGNkZTRlMzQwNzA4IiwidXNlcl9pZCI6MjJ9.Gfn7HrIwM4jHrqGLvNQ7Hgeidg96aQCfduDn4IkZxZc'
        }
      });
    }
    return next.handle(request);
  }
}