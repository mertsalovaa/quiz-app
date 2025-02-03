import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import { DebugElement } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { QuestionItemComponent } from '../../components/question-item/question-item.component';
import { isComponentExist } from '../quizzes-catalog/quizzes-catalog.component.spec';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { ButtonComponent } from '../../ui-kit/components/button/button.component';
import { LinkComponent } from '../../ui-kit/components/link/link.component';
import { SpinnerComponent } from '../../ui-kit/components/spinner/spinner.component';
import { ModalWindowComponent } from '../../ui-kit/components/modal-window/modal-window.component';
import { StoreService } from '../../store/service/store.service';
import { BehaviorSubject, of } from 'rxjs';
import { questions$ } from '../../services/statistics/statistics.service.spec';
import { ModalWindowService, ModalWindowState } from '../../services/modal-window/modal.service';
import { QUESTIONS_SIZE } from '../../utils/constants';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalRoutes } from '../../ui-kit/components/modal-window/modal-window.routes.enum';
import { DEFAULT_MODAL_DATA } from '../../ui-kit/components/modal-window/modal-window.constants';
import { StatisticService } from '../../services/statistics/statistics.service';
import { canDeactivateGuard } from '../../guards/can-deactivate.guard';
import { QUIZ_DATA } from '../../test-data/quiz';
import { testQuizResult } from '../statistics/statistics.component.spec';

describe('QuestionComponent', () => {
  let fixture: ComponentFixture<QuestionComponent>;
  let component: QuestionComponent;
  let debugElement: DebugElement;

  let storeService: Partial<StoreService>;
  let modalService: Partial<ModalWindowService>;
  let statisticService: Partial<StatisticService>;

  let router: Router;

  let nextIndex: number = 2;
  let prevIndex: number = 1;

  beforeEach(async() => {
    storeService = {
      getQuestions: jest.fn(() => questions$),
      getLoadingQuestions: jest.fn(() => of(true)),
      loadQuestions: jest.fn(),   
    };

    modalService = {
      handleModalAction: jest.fn(),
      setModalData: jest.fn(() => DEFAULT_MODAL_DATA),
      setModalState: jest.fn(() => true), 
      modalState$: new BehaviorSubject<ModalWindowState>({
        visibility: false,
        choice: false,
        data: DEFAULT_MODAL_DATA,
      }),
    };

    statisticService = {
      initResult: jest.fn(() => testQuizResult),
      initScore: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ QuestionComponent, UIKitModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ provideMockStore(), 
        provideRouter([]),
        { provide: StoreService, useValue: storeService },
        { provide: ModalWindowService, useValue: modalService },
        { provide: StatisticService, useValue: statisticService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render children components correctly', () => {
    isComponentExist(debugElement, TypographyComponent);
    isComponentExist(debugElement, ButtonComponent);
    isComponentExist(debugElement, LinkComponent);
    isComponentExist(debugElement, QuestionItemComponent);
    isComponentExist(debugElement, SpinnerComponent);
    isComponentExist(debugElement, ModalWindowComponent);
  });

  it('should call store service on ngOnInit', () => {
    expect(storeService.getQuestions).toHaveBeenCalled();
    expect(storeService.getLoadingQuestions).toHaveBeenCalled();
    expect(storeService.loadQuestions).toHaveBeenCalled();
    expect(storeService.loadQuestions).toHaveBeenCalledWith(Number(component.quiz));
  });

  it('should decrement and increment current index on prev or next questions', () => {
    component.currentIndex$.next(nextIndex);
    component.prevQuestion();

    expect(component.currentIndex$.value).toBe(prevIndex);

    component.nextQuestion();

    expect(component.currentIndex$.value).toBe(nextIndex);
  });

  it('should go to statistic page with /finish path on last question', () => {
    const routerSpy = jest.spyOn(router, 'navigateByUrl').mockImplementation();
    
    component.currentIndex$.next(QUESTIONS_SIZE - 1);
    component.nextQuestion();
    
    expect(routerSpy).toHaveBeenCalledWith(ModalRoutes.Finish);
  });

  it('should set selected answer correctly', () => {
    component.setSelectedAnswer('Test Answer');
    expect(component.answers$.getValue()[0]).toBe('Test Answer');
  });

  it('should show modal when unloadNotification is triggered without choice', () => {
    const event = new Event('beforeunload') as BeforeUnloadEvent;
    jest.spyOn(event, 'preventDefault');
    
    fixture.detectChanges();
    component.unloadNotification(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(modalService.modalState$?.value.data.link).toBe(DEFAULT_MODAL_DATA.link);
  });
  
  it('should handle response from modal window correctly', () => {
    // eslint-disable-next-line dot-notation
    component['nextRoute'] = ModalRoutes.Finish;
    fixture.detectChanges();
    component.handleModalResponse(true);
    expect(statisticService.initResult).toHaveBeenCalled();
  
    component.handleModalResponse(false);
    fixture.detectChanges();
    expect(modalService.handleModalAction).toHaveBeenCalled();
  });

  it('should return true if user is logged in', () => {
    component.answers$.next([]);
    const result = canDeactivateGuard(component, {} as any, {} as RouterStateSnapshot, {} as RouterStateSnapshot);

    expect(result).toBeTruthy(); 
    
    component.answers$.next(QUIZ_DATA[0].answers);
    expect(modalService.setModalState).not.toHaveBeenCalled();
    
    expect(result).toBeTruthy();    
  });
});
