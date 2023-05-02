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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDAxNDk5LCJpYXQiOjE2ODMwMDA1OTksImp0aSI6ImEzZTc5MmZhNDcwYTQ5M2M5YjA4NzFhOGE1YWFmZWJlIiwidXNlcl9pZCI6MjJ9.hkr-_Azcz-Uf4L4Abepcg1QSI5_HZwmQtLoG-UCa0sc'
        }
      });
    }
    return next.handle(request);
  }
}