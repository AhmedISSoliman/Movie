import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit() {
    this.isFormSubmitted = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.spinnerService.show();
    this.authService.register(this.registerForm.value).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.toastr.success(res.message);
        localStorage.setItem('userToken', res.authorisation.token);
        this.authService.saveCurrentUser();
        this.router.navigate(['/home'])
      }
      else if (res.status == 'failed') {
        this.toastr.error(res.message.email);
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastr.error('General error happend');
    })
  }
  //   onSubmit() {
  //   this.isFormSubmitted = false;
  //   if (this.registerForm.invalid) {
  //     return;
  //   }
  //   this.spinnerService.show()
  //   this.authService.register(this.registerForm.value).subscribe(res => {
  //     this.spinnerService.hide();
  //     if (res.status == 'success') {
  //       this.toastr.success(res.message);
  //       localStorage.setItem('userData', JSON.stringify(res.user));
  //       // this.authService.saveCurrentUser();
  //       this.router.navigate(['/login'])
  //     }
  //     else if (res.status == 'failed') {
  //       this.toastr.error(res.message.email);
  //     }
  //   }, err => {
  //     this.spinnerService.hide();
  //     // this.toastr.error('General error happend');
  //   })
  // }
}
