import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { QuestionModel } from './question.model';
import { API_ENDPOINTS } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}
  
  getQuestions(category: number): Observable<QuestionModel[]> {
    const params = new URLSearchParams();
    if (category !== 0) {
      params.append('category', category.toString());
    }
    params.append('type', 'multiple');

    return this.http
    .get<{ results: QuestionModel[] }>(`${API_ENDPOINTS.QUESTION_URL}${params}`)
    .pipe(
      map(response => response.results),  
      catchError(() => {
        return throwError(() => new Error('An error occurred. Please reload the page or try later.'));
      })
    );
  }
}
