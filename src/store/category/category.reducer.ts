import { createReducer, on } from '@ngrx/store';
import { CategoryModel } from '../../app/services/model/category.model';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: CategoryModel[];
  loading: boolean;
  error: string;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: '',
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, state => ({ ...state, loading: true })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories, loading: false })),
  on(CategoryActions.loadCategoriesFail, (state, { error }) => ({ ...state, error, loading: false })),
);
