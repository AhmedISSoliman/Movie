import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './guards/auth.guard.service';
import { CurrentUserGuard } from './guards/current-user.guard';
import { FullLyoutComponent } from './theme/full-lyout/full-lyout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    canActivate: [CurrentUserGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [CurrentUserGuard],
    component: RegisterComponent
  }
  ,
  {
    path: '',
    component: FullLyoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../app/modules/movies/movies.module').then((m) => m.MoviesModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
