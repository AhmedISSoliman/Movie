import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private router: Router,
    private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err)
      if (err.status == 401) {
        this.toastrService.error(err.error.message);
        this.router.navigate(['/login']);
        this.authService.logOut();
        return throwError(err);
      }
      else if (err.status == 404) {
        this.toastrService.error(err.error.message);
      }
      return throwError(err);
    }));
  }
}
