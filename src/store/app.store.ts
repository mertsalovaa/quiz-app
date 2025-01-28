import { Action, ActionReducer } from '@ngrx/store';
import { categoryReducer, CategoryState } from './category/category.reducer';
import { CategoryEffects } from './category/category.effects';
import { questionsReducer, QuestionState } from './question/question.reducer';
import { QuestionEffects } from './question/question.effects';

export interface AppState {
  categories: CategoryState;
  questions: QuestionState
}

export interface AppStore {
  categories: ActionReducer<CategoryState, Action>;
  questions: ActionReducer<QuestionState, Action>;
}

export const appStore: AppStore = {
  categories: categoryReducer,
  questions: questionsReducer,
};

export const appEffects = [ CategoryEffects, QuestionEffects ];
