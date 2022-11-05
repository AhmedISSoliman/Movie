import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted: boolean = false;
  userData: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  login() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinnerService.show();
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        localStorage.setItem('userToken', res.authorisation.token);
        this.authService.saveCurrentUser();
        this.router.navigate(['/home'])
      }
      else if (res.status == 'error') {
        this.toastrService.error(res.message)
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error(err.message)
    })
  }

  // login() {
  //   this.isFormSubmitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.spinnerService.show();
  //   if (this.userData.email == this.loginForm.value.email) {

  //     this.authService.login(this.loginForm.value).subscribe(res => {
  //       this.spinnerService.hide();
  //       if (res.status == 'success') {
  //         localStorage.setItem('userToken', res.authorisation.token);
  //         this.authService.saveCurrentUser();
  //         this.router.navigate(['/home'])
  //       }
  //       else if (res.status == 'error') {
  //         this.toastrService.error(res.message)
  //       }
  //     }, err => {
  //       this.spinnerService.hide();
  //       // this.toastrService.error(err.message)
  //     })

  //   }
  //   else {
  //     this.toastrService.error('You are not registered')
  //   }
  // }
}
