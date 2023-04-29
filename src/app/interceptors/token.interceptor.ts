import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken'); // get the auth token from local storage
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // set the Authorization header with the token
        }
      });
    }
    return next.handle(request);
  }
}