import { DestroyRef, inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';
import * as QuestionActions from './question.actions';
import { ErrorHandleService } from '../../app/services/error.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuestionService } from '../../app/services/question.service';
import { QuestionModel } from '../../app/services/model/question.model';

@Injectable()
export class QuestionEffects {
  constructor(private questionService: QuestionService, private errorService: ErrorHandleService, private store: Store<AppState>, private destroyRef: DestroyRef) {}

  loadQuestions$ = createEffect(() => inject(Actions)
  .pipe(ofType(QuestionActions.loadQuestions),
    switchMap(({ categoryId }) => this.questionService.getQuestions(categoryId).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((questions: QuestionModel[]) => QuestionActions.loadQuestionsSuccess({ questions })),
      catchError((error) => {
        this.errorService.handleError(error);
        return of(QuestionActions.loadQuestionsFail({ error }));
      }) 
    ))));
}
