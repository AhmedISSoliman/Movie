import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard.service';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: MoviesListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
