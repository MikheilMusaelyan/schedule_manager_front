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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjQ2Nzk5LCJpYXQiOjE2ODMyNDU4OTksImp0aSI6ImU4ZGFhMTcxZDU2ZDQ1Y2I4ZjM5ZjM5NmUwYWI2MTY0IiwidXNlcl9pZCI6MjJ9.7lVETTTz6jtpLx85C_AIslVf_amJcUSmH-2hrXUM1o8'
        }
      });
    }
    return next.handle(request);
  }
}