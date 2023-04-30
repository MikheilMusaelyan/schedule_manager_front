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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyODcyMDk5LCJpYXQiOjE2ODI4NzExOTksImp0aSI6IjI1OGU4OWEwODZkZDQ5NGE5MTM1MDU1YjQ0NjEyNGRiIiwidXNlcl9pZCI6MjJ9.Z04gxKMs6HPdKtVqRgNR3YK3DBxmt06jf435yXiIkTs'
        }
      });
    }
    return next.handle(request);
  }
}