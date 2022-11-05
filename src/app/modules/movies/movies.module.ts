import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesCreateComponent } from './movies-create/movies-create.component';
import { MoviesEditComponent } from './movies-edit/movies-edit.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesCreateComponent,
    MoviesEditComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    NgxSpinnerModule,
    NgbModule,
    RouterModule,
    NgSelectModule
  ],
  providers: [

  ]
})
export class MoviesModule { }
