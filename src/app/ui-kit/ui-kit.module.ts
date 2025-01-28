import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { TypographyComponent } from './components/typography/typography.component';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HeaderComponent } from './layout/header/header.component';
import { LinkComponent } from './components/link/link.component';
import { RouterModule } from '@angular/router';
import { CardQuizComponent } from './components/card-quiz/card-quiz.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QuestionItemComponent } from './components/question-item/question-item.component';
import { RadioButtonComponent } from './components/radio-group/radio-button/radio-button.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ChartRatingComponent } from './components/chart-rating/chart-rating.component';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    ButtonComponent,
    TypographyComponent,
    LinkComponent,
    HeaderComponent,
    CardQuizComponent,
    SpinnerComponent,
    QuestionItemComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ModalWindowComponent,
    NotificationComponent,
    ChartRatingComponent,
    StatisticCardComponent,
  ],
  exports: [
    ButtonComponent,
    TypographyComponent,
    LinkComponent,
    HeaderComponent,
    CardQuizComponent,
    SpinnerComponent,
    QuestionItemComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    ModalWindowComponent,
    NotificationComponent,
    ChartRatingComponent,
    StatisticCardComponent,
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
})
export class UIKitModule {}
