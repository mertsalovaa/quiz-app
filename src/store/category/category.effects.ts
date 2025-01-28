import { DestroyRef, inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';
import { CategoryService } from '../../app/services/category.service';
import * as CategoryActions from './category.actions';
import { ErrorHandleService } from '../../app/services/error.service';
import { Store } from '@ngrx/store';
import { CategoryModel } from '../../app/services/model/category.model';
import { AppState } from '../app.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class CategoryEffects {
  constructor(private categoryService: CategoryService, private errorService: ErrorHandleService, private store: Store<AppState>, private destroyRef: DestroyRef) {}

  loadCategories$ = createEffect(() => inject(Actions)
  .pipe(ofType(CategoryActions.loadCategories),
    switchMap(() => this.store.select(state => state.categories.categories).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap((categories) => {
        if (categories && categories.length > 0) {
          return of(CategoryActions.loadCategoriesSuccess({ categories }));
        }
        return this.categoryService.get().pipe(
          map((categories : CategoryModel[]) => CategoryActions.loadCategoriesSuccess({ categories })),
          catchError((error) => {
            this.errorService.handleError(error); 
            return of(CategoryActions.loadCategoriesFail({ error }));
          })
        );    
      })
    ))));
}
