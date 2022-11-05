import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryListModel } from '../../models/movies-list-view.model';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.scss']
})
export class MoviesCreateComponent implements OnInit {
  createForm: FormGroup
  isFormSubmitted: boolean = false;
  @Input() public categories: CategoryListModel[];
  baseUrl: string = environment.baseUrl
  imgFile: string;

  imageSrc: string;
  selectedFile: any;
  formData = new FormData()
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private movieService: MoviesService,
    private toastService: ToastrService

  ) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      image: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      fileSource: [null],
    })
  }
  // on file select event
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createForm.patchValue({
        fileSource: file
      });
    }
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.createForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.createForm.get('fileSource').value);
    formData.append('name', this.createForm.get('name').value);
    formData.append('description', this.createForm.get('description').value);
    formData.append('category_id', this.createForm.get('category_id').value);
    // for (let key in this.createForm.value) {
    //   if (this.createForm.value.hasOwnProperty(key)) {
    //     this.formData.append(key, this.createForm.value[key]);
    //   }
    // }
    console.log(this.createForm.value)
    this.spinnerService.show();
    this.movieService.createMovie(formData).subscribe(res => {
      this.spinnerService.hide();
      if (res.status == 'success') {
        this.activeModal.close(true);
      }
      else if (res.status == 'failed') {
        this.activeModal.close();
        this.toastService.error(res.message)
      }
    }, err => {
      this.spinnerService.hide();
      this.activeModal.close();
      // this.toastService.error('General Error happend');
    })
  }
}
