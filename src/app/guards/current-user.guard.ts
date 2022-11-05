import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class CurrentUserGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.currentUser.value) {
      this.toastrService.warning('You are already logged in');
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
