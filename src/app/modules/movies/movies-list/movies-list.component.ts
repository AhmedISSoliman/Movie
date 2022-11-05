import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from './../../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryListModel, MoviesListViewMode } from './../../models/movies-list-view.model';
import { environment } from './../../../../environments/environment';
import { MoviesCreateComponent } from './../movies-create/movies-create.component';
import { MoviesEditComponent } from '../movies-edit/movies-edit.component';
import { MovieDetailsComponent } from './../movie-details/movie-details.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  moviesList: MoviesListViewMode[];
  categoriesList: CategoryListModel[];
  baseUrl = environment.baseUrl
  constructor(
    private movieService: MoviesService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getAllCategories();
  }
  getAllMovies() {
    this.spinnerService.show();
    this.movieService.getAllMovies().subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.moviesList = res.message
      }
      else {
        this.toastrService.error('Failed to get movies')
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error('General error happend')
    })
  }
  getAllCategories() {
    this.spinnerService.show();
    this.movieService.getAllCategories().subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.categoriesList = res.message;
        this.categoriesList.unshift({
          name: 'All',
          id: 200,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
      else {
        this.toastrService.error(res.status)
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error('General error happend')
    })

  }
  OpenMovieCreate() {
    const modalRef = this.modalService.open(MoviesCreateComponent);
    modalRef.componentInstance.categories = this.categoriesList;
    modalRef.result.then(result => {
      if (result) {
        this.getAllMovies();
      }
    }).catch(res => { })
  }

  openMovieUpdate(movieId: number) {
    const modalRef = this.modalService.open(MoviesEditComponent);
    modalRef.componentInstance.movieId = movieId;
    modalRef.componentInstance.categories = this.categoriesList;
    modalRef.result.then(result => {
      if (result) {
        this.getAllMovies();
      }
    }).catch(res => { })
  }
  openMovieDetails(movieId: number) {
    const modalRef = this.modalService.open(MovieDetailsComponent);
    modalRef.componentInstance.movieId = movieId;
    modalRef.result.then(result => {
      if (result) {
        this.getAllMovies();
      }
    }).catch(res => { })
  }

  browsMovieByCategory(e: any) {
    this.spinnerService.show();
    this.movieService.getMovieByCategory(e.id).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        console.log(res)
        if (e.id == 200) {
          this.getAllMovies();
        }
        this.moviesList = res.message;
      }
      else {
        this.toastrService.error('failed to get category');
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error('General Error Happend');
    })
  }
}
