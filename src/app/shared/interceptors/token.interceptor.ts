import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('tokenObject'))?.token;
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNDA3MTA5LCJpYXQiOjE2ODM0MDYyMDksImp0aSI6IjgzYzkyZTBmN2RhZjQ1YWU5ZWFmZmY5YzY5NWEzOThkIiwidXNlcl9pZCI6MjJ9.GHfrorkbSi5_f2RJJ8FcSp5_0AR6XiFrlnJKJbtgIfQ'
        }
      });
    }
    return next.handle(request);
  }
}