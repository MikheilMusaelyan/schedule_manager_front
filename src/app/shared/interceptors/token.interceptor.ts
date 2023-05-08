import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const loginObject = JSON.parse(localStorage.getItem('schedule_login'));
    const accessToken = loginObject?.access;
    const refreshToken = loginObject?.refresh;

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  
    if (true) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNTAwMTQyLCJpYXQiOjE2ODM0OTkyNDIsImp0aSI6ImRiNTJhZjI2ZjM3ZjQzZmI5OGRkODQ5YjBlYzcxMDIwIiwidXNlcl9pZCI6MjJ9.Rq0nnR9LWBX4Er5Wa4DW1V8hZVELETl4rZ5ZRPy-7Kg'
        }
      });
    }
    return next.handle(request);
  }

 
  // ngOnInit() {
  //   const token = JSON.parse(localStorage.getItem('schedule_login'))?.access;
    
  //   if (token && this.tokenExpired(token)) {
  //     // Token expired
  //   } else {
  //     // Token valid or not present
  //   }
  // }
}