import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MoviesService } from './modules/services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie';
}
