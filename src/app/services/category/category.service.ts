import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from './category.model';
import { API_ENDPOINTS, TOTAL_QUIZZES_COUNT } from '../../utils/constants';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  get(): Observable<CategoryModel[]> {
    return this.http
    .get<{ trivia_categories: CategoryModel[] }>(API_ENDPOINTS.CATEGORY_URL)
    .pipe(
      map(response => response.trivia_categories.slice(0, TOTAL_QUIZZES_COUNT)),  
      catchError(() => {
        return throwError(() => new Error('An error occurred. Please reload the page or try later.'));
      })
    );
  }
}
