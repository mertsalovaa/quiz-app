import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.store';
import { Observable } from 'rxjs';

import { QuestionModel } from '../../services/question/question.model';
import { CategoryModel } from '../../services/category/category.model';

import * as CategoryActions from '../category/category.actions';
import * as QuestionActions from '../question/question.actions';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<AppState>) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.store.select(state => state.categories.categories);
  }
  
  getQuestions(): Observable<QuestionModel[]> {
    return this.store.select(state => state.questions.questions);
  }
  
  getLoadingCategories(): Observable<boolean> {
    return this.store.select(state => state.categories.loading);
  }
  
  getLoadingQuestions(): Observable<boolean> {
    return this.store.select(state => state.questions.loading);
  }

  loadCategories(): void {    
    this.store.dispatch(CategoryActions.loadCategories());
  }

  loadQuestions(categoryId: number): void {   
    this.store.dispatch(QuestionActions.loadQuestions({ categoryId: categoryId }));
  }
}
