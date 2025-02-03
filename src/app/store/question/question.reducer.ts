import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from './question.actions';
import { QuestionModel } from '../../services/question/question.model';

export interface QuestionState {
  questions: QuestionModel[];
  loading: boolean;
  error: string;
}

export const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: '',
};

export const questionsReducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, state => ({ ...state, loading: true })),
  on(QuestionActions.loadQuestionsSuccess, (state, { questions }) => ({ ...state, questions: questions, loading: false })),
  on(QuestionActions.loadQuestionsFail, (state, { error }) => ({ ...state, error, loading: false })),
);
