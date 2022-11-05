import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/shared/models/API-response';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/environments/urls';
import { CategoryListModel, MovieDetailsModel, MoviesListViewMode } from './../models/movies-list-view.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<APIResponse<MoviesListViewMode[]>> {
    return this.http.get<APIResponse<MoviesListViewMode[]>>(`${environment.baseUrl}${ApiPaths.GetAllMovies}`)
  }

  getMovieDetails(movieId: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${environment.baseUrl}${ApiPaths.GetMovieDetail}${movieId}`)
  }

  createMovie(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${ApiPaths.CreateMovie}`, data)
  }

  updateMovie(data: any, movieId: number): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}${ApiPaths.EditMovie}${movieId}`, data)
  }

  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}${ApiPaths.DeleteMovie}${movieId}`)
  }

  getAllCategories(): Observable<APIResponse<CategoryListModel[]>> {
    return this.http.get<APIResponse<CategoryListModel[]>>(`${environment.baseUrl}${ApiPaths.GetAllCategories}`)
  }
  getMovieByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${ApiPaths.GetMovieByCategory}${id}`)
  }
}
