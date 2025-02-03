import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../services/category/category.model';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ categories: CategoryModel[] }>()
);
export const loadCategoriesFail = createAction(
  '[Category] Load Categories Fail',
  props<{ error: string }>()
);
