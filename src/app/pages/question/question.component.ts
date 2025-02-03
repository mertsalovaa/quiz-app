import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionModel } from '../../services/question/question.model';
import { StoreService } from '../../store/service/store.service';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  take,
} from 'rxjs';
import { QUESTIONS_SIZE } from '../../utils/constants';
import { ModalWindowModel } from '../../services/modal-window/modal.model';
import { ModalWindowService } from '../../services/modal-window/modal.service';
import { ModalRoutes } from '../../ui-kit/components/modal-window/modal-window.routes.enum';
import { decodeQuestion } from '../../utils/decode-html';
import { TimeService } from '../../services/statistics/time/time.service';
import { StatisticService } from '../../services/statistics/statistics.service';
import { QuizResultModel } from '../../services/statistics/quiz-result.model';
import { getStatisticText } from './statistics-texts.constants';

@Component({
  standalone: true,
  selector: 'app-quiz',
  templateUrl: './question.component.html',
  imports: [ UIKitModule, CommonModule ],
})
export class QuestionComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (!(this.modalService.modalState$.getValue()?.choice)) {
      $event.preventDefault();
      this.nextRoute = ModalRoutes.Refresh;
    }
  }

  @Input() quiz: string = '';
  private nextRoute: string = '';

  questions$!: Observable<QuestionModel[]>;
  isLoading$!: Observable<boolean>;
  currentIndex$ = new BehaviorSubject<number>(0);
  currentQuestion$!: Observable<QuestionModel>;
  answers$ = new BehaviorSubject<string[]>([]);

  modalWindowState$!: Observable<boolean>; 
  modalWindowData$!: Observable<ModalWindowModel>;

  get options(): Observable<string[]> {
    return this.currentQuestion$.pipe(
      take(1),
      map((item) => {
        return [
          ...item.incorrect_answers,
          item.correct_answer,
        ]
        .sort()
        .reverse();
      }),
    );
  }

  get id(): number {
    return this.currentIndex$.value + 1;
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private modalService: ModalWindowService, 
    private timeService: TimeService,
    private statisticService: StatisticService,
  ) {}

  canDeactivate(): Observable<boolean> {
    if (this.answers$.getValue()[0] === undefined) {
      return of(true);
    }
    if (!(this.modalService.modalState$.getValue().choice)) {
      this.modalService.setModalState(this.nextRoute);      
      return this.modalService.modalState$.pipe(
        take(1),
        map(state => state.choice)
      );
    }
    this.modalService.closeModal();
    return of(true);
  }

  ngOnInit(): void {
    // eslint-disable-next-line dot-notation
    this.quiz = this.activeRoute.snapshot.params['id'];
    this.questions$ = this.storeService.getQuestions();
    this.isLoading$ = this.storeService.getLoadingQuestions();
    this.storeService.loadQuestions(Number.parseInt(this.quiz));

    this.modalWindowData$ = this.modalService.modalState$.pipe(
      map(state => state.data)
    );

    this.modalWindowState$ = this.modalService.modalState$.pipe(
      map(state => state.visibility)
    );

    this.currentQuestion$ = combineLatest([
      this.questions$,
      this.currentIndex$,
    ]).pipe(
      map(
        ([ questions, index ]) => {
          const question = questions?.[index] || {
            question: '',
            type: false,
            difficulty: '',
            category: '',
            correct_answer: '',
            incorrect_answers: [],
          };
          return decodeQuestion(question);
        }
      ),
    );

    this.timeService.startTest();
    this.handleNavigation();
  }

  handleModalResponse(confirm: boolean): void {
    if (confirm === true && this.nextRoute === ModalRoutes.Finish) {
      const time: number = this.timeService.finishTest();
      const score: number = this.statisticService.initScore(this.questions$, this.answers$.getValue());
      const result: QuizResultModel = {
        seconds: time,
        formattedTime: this.timeService.formatTime(time),
        score: score,
        resultText: getStatisticText(score),
      };
      this.statisticService.initResult(result);
    }
    this.modalService.handleModalAction(confirm);
  }
  
  nextQuestion(): void {
    const currentIndex = this.currentIndex$.value;
    if (currentIndex < QUESTIONS_SIZE - 1) {
      this.currentIndex$.next(currentIndex + 1);
    } else {
      this.router.navigateByUrl(ModalRoutes.Finish);
    }
  }
  
  prevQuestion(): void {
    const currentIndex = this.currentIndex$.value;
    if (currentIndex > 0) {
      this.currentIndex$.next(currentIndex - 1);
    }
  }
  
  setSelectedAnswer(value: string): void {
    this.answers$.getValue()[this.currentIndex$.value] = value;
  }

  private handleNavigation(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => event.url)
    ).subscribe((url) => {
      this.nextRoute = url;
    });
  }
}
