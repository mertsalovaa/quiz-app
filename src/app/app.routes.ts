import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'quizzes-catalog', loadComponent: () => import('../app/pages/quizzes-catalog/quizzes-catalog.component').then(x => x.QuizzesCatalogComponent) },
  { 
    path: 'quiz/:id', 
    loadComponent: () => import('./pages/question/question.component').then(x => x.QuestionComponent), 
    canDeactivate: [canDeactivateGuard], 
  },
  { path: 'statistics', loadComponent: () => import('../app/pages/statistics/statistics.component').then(x => x.StatisticsComponent) },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
];
