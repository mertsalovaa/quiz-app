import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects, appStore } from '../app/store/app.store';
import { CategoryService } from './services/category/category.service';
import { ErrorHandleService } from './services/error/error.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appStore),
    provideEffects(appEffects),
    CategoryService,
    [{ provide: ErrorHandler, useClass: ErrorHandleService }],
  ],
};
