import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ApiPaths } from 'src/environments/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser = new BehaviorSubject<any>(null);
  registertUser = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveCurrentUser();
    }
    // if (localStorage.getItem('registerToken') != null) {
    //   this.saveRegistertUser();
    // }
  }

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}${ApiPaths.Login}`, userData);
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}${ApiPaths.Register}`, userData)
  }

  saveCurrentUser() {
    var token: any = localStorage.getItem('userToken');
    this.currentUser.next(token);
    var decoded = jwtDecode(token);
    return decoded;
  }
  // saveRegistertUser() {
  //   var token: any = localStorage.getItem('registerToken');
  //   this.registertUser.next(token);
  //   var decoded = jwtDecode(token);
  //   return decoded;
  // }

  // saveCurrentAdmin() {
  //   var token: any = localStorage.getItem('adminToken');
  //   this.currentUser.next(token);
  //   var decoded = jwtDecode(token);
  //   return decoded;
  // }

  logOut() {
    this.currentUser.next(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
