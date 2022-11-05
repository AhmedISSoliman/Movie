import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListModel, MoviesListViewMode } from './../../models/movies-list-view.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.scss']
})
export class MoviesEditComponent implements OnInit {
  @Input() public movieId: number;
  @Input() public categories: CategoryListModel[];
  editForm: FormGroup;
  isFormSubmitted: boolean = false;
  baseUrl = environment.baseUrl;
  imagesrc: any;
  isfile = false
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private movieService: MoviesService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      image: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      fileSource: [null],
    });
  }

  ngOnInit(): void {

    this.getMovieById();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.patchValue({
        fileSource: file
      });
    }
  }
  getMovieById() {
    this.spinnerService.show();
    this.movieService.getMovieDetails(this.movieId).subscribe(res => {
      this.spinnerService.hide();
      // const inputElement: HTMLInputElement = document.getElementById('image') as HTMLInputElement
      // inputElement.files = null;
      if (res.status == 'success') {
        // const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
        // dataTransfer.items.add(new File([...this.baseUrl], res.message.image));
        // const inputElement: HTMLInputElement = document.getElementById('image') as HTMLInputElement

        // inputElement.files = dataTransfer.files;

        this.editForm.patchValue({
          name: res.message.name,
          description: res.message.description,
          category_id: res.message.category_id,
          image: res.message.image,
        })
      }
      else if (res.status == 'failed') {
        this.toastrService.error(res.message)
      }
    }, err => {
      this.spinnerService.hide();
      // this.toastrService.error('General Error Happend')
    })
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.editForm.get('fileSource').value);
    formData.append('name', this.editForm.get('name').value);
    formData.append('description', this.editForm.get('description').value);
    formData.append('category_id', this.editForm.get('category_id').value);
    this.spinnerService.show();
    this.movieService.updateMovie(formData, this.movieId).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.activeModal.close(true);
      }
      else {
        this.activeModal.close();
        this.toastrService.error(res.status)
      }
    }, err => {
      this.spinnerService.hide();
      this.activeModal.close();
      // this.toastrService.error('General Error Happend')
    })
  }
}
