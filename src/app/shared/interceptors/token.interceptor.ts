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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjU3OTc0LCJpYXQiOjE2ODMyNTcwNzQsImp0aSI6IjdiZmU2MzdjMzJlMTQ3NmM5OWJiMDA0NjM3ZmJiMzk3IiwidXNlcl9pZCI6MjJ9.wFvJWBey-PGi1ud0Fmzd7cL0tOZ3qfEej3NNQCXTFe8'
        }
      });
    }
    return next.handle(request);
  }
}