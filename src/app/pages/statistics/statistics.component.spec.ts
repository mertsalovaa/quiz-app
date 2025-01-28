import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { DebugElement } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { StatisticService } from '../../services/statistics.service';
import { CHART_DATA } from '../../test-data/chart.data';
import { QuizResultModel } from '../../services/model/quiz-result.model';
import { isComponentExist } from '../quizzes-catalog/quizzes-catalog.component.spec';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { ButtonComponent } from '../../ui-kit/components/button/button.component';
import { LinkComponent } from '../../ui-kit/components/link/link.component';
import { StatisticCardComponent } from '../../ui-kit/components/statistic-card/statistic-card.component';
import { ChartRatingComponent } from '../../ui-kit/components/chart-rating/chart-rating.component';

export const testQuizResult: QuizResultModel = {
  seconds: 75,
  formattedTime: '1 min 15 sec',
  score: 5,
  resultText: 'Good try! Why not have another go? You might get a bigger score!',
};

describe('StatisticsComponent', () => {
  let fixture: ComponentFixture<StatisticsComponent>;
  let component: StatisticsComponent;
  let debugElement: DebugElement;
  let statisticService: Partial<StatisticService>;

  beforeEach(async() => {
    statisticService = {
      getStatisticData: jest.fn(() => CHART_DATA),
      getQuizResult: jest.fn(() => testQuizResult),
    };

    await TestBed.configureTestingModule({
      imports: [ StatisticsComponent, UIKitModule, HttpClientTestingModule ],
      providers: [ provideMockStore(), 
        provideRouter([]),
        { provide: StatisticService, useValue: statisticService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should call statistic service on ngOnInit', () => {
    expect(statisticService.getStatisticData).toHaveBeenCalled();
    expect(statisticService.getQuizResult).toHaveBeenCalled();
  });

  it('should render children components correctly', () => {
    isComponentExist(debugElement, TypographyComponent);
    isComponentExist(debugElement, ButtonComponent);
    isComponentExist(debugElement, LinkComponent);
    isComponentExist(debugElement, StatisticCardComponent);
    isComponentExist(debugElement, ChartRatingComponent);
  });
});
