import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { FullLyoutComponent } from './theme/full-lyout/full-lyout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './interceptors/interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrentUserGuard } from './guards/current-user.guard';
import { AuthGuard } from './guards/auth.guard.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    FullLyoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    HttpClientModule,
    NgSelectModule


  ],
  providers: [
    AuthGuard,
    CurrentUserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
