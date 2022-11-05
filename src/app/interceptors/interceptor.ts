import { Injectable } from '@angular/core';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  userLogIn: any;
  constructor(private authService: AuthenticationService) {
    // this.userLogIn = localStorage.getItem('userToken');
    // this.authService.inToken
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUser.getValue();
    if (request.url.startsWith(environment.baseUrl)) {
      // set yout headers for all request for token of user
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      })
    }
    return next.handle(request);
  }
}
