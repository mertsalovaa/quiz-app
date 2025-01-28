import { ModalWindowModel } from '../services/model/modal.model';
import { ModalRoutes } from './modal-routes.enum';

export const DEFAULT_MODAL_DATA: ModalWindowModel = {
  title: 'Leave quiz',
  page: 'main page',
  link: '/main',
  text: 'Are you sure you want to exit and cancel the quiz? Your answers will not be saved.',
};

export const MODAL_DATA: Record<string, ModalWindowModel> = {
  [ModalRoutes.QuizzesCatalog]: {
    title: DEFAULT_MODAL_DATA.title,
    text: DEFAULT_MODAL_DATA.text,
    page: 'quizzes catalog',
    link: '/quizzes-catalog',
  },
  [ModalRoutes.Statistics]: {
    title: DEFAULT_MODAL_DATA.title,
    text: DEFAULT_MODAL_DATA.text,
    page: 'statistics',
    link: '/statistics',
  },
  [ModalRoutes.Refresh]: {
    page: 'new quiz session',
    link: '',
    title: 'Refresh page',
    text: 'Do you want to refresh your quiz?\n Your current result will be lost',
  },
  [ModalRoutes.Finish]: {
    page: 'statistics',
    link: '/statistics',
    title: 'Finish quiz',
    text: 'To get your quiz result, please, confirm this action and go to the page with the conclusion.',
  },
  [ModalRoutes.Quiz]: {
    page: 'quiz',
    link: '/quiz/0',
    title: DEFAULT_MODAL_DATA.title,
    text: DEFAULT_MODAL_DATA.text,
  },
  '': {
    ...DEFAULT_MODAL_DATA,
  },
};
