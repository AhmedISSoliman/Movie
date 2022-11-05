import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../../../environments/environment';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  @Input() public movieId: number;
  movieDetails: any;
  baseUrl = environment.baseUrl
  constructor(
    public activeModal: NgbActiveModal,
    private movieService: MoviesService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMovieById();
  }
  getMovieById() {
    this.spinnerService.show();
    this.movieService.getMovieDetails(this.movieId).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.movieDetails = res.message
      }
      else if (res.status == 'failed') {
        this.toastrService.error('Failed to get movie')
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error('General Error Happend')
    })
  }
  confirmDelete(id: number) {
    this.spinnerService.show();
    this.movieService.deleteMovie(id).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.activeModal.close(true);
      }
      else {
        this.activeModal.close();
        this.toastrService.error('failed to delete event');
      }
    }, err => {
      this.spinnerService.hide();
      this.activeModal.close();
      // this.toastrService.error('failed to delete event');
    })
  }
}
