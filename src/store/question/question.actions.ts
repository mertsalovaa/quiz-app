import { createAction, props } from '@ngrx/store';
import { QuestionModel } from '../../app/services/model/question.model';

export const loadQuestions = createAction(
  '[Question] Load Questions',
  props<{ categoryId: number }>(),
);
export const loadQuestionsSuccess = createAction(
  '[Question] Load Questions Success',
  props<{ questions: QuestionModel[] }>(),
);
export const loadQuestionsFail = createAction(
  '[Question] Load Questions Fail',
  props<{ error: string }>(),
);
