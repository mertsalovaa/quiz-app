import { Observable } from 'rxjs';
import { CHART_DATA } from '../test-data/chart.data';
import { QuestionModel } from './model/question.model';
import { Injectable } from '@angular/core';
import { ChartModel } from './model/chart.modal';
import { QuizResultModel } from './model/quiz-result.model';
import { decodeText } from '../utils/decode-html';
import { QUESTIONS_SIZE, SECONDS, STORAGE_KEYS } from '../utils/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private storage: StorageService) {}

  getQuizResult(): QuizResultModel | null {
    return this.storage.getFromStorage<QuizResultModel | null>(
      STORAGE_KEYS.QUIZ_RESULT,
      null,
    );
  }

  getStatisticData(): ChartModel {
    return this.storage.getFromStorage<ChartModel>(STORAGE_KEYS.CHART, CHART_DATA);
  }

  initDefaultStatistic() {
    if (!localStorage.getItem(STORAGE_KEYS.CHART)) {
      this.storage.saveToStorage(STORAGE_KEYS.CHART, CHART_DATA);
    }
  }

  initScore(
    questions$: Observable<QuestionModel[]>,
    answers: string[],
  ): number {
    let result: number = 0;

    questions$.subscribe((questions) => {
      questions.forEach((question, index) => {
        const isCorrect = decodeText(question.correct_answer) === answers[index];
        if (isCorrect) {
          result++;
        }
      });
    }).unsubscribe();
    return result;
  }

  initResult(data: QuizResultModel): void {
    this.storage.saveToStorage(STORAGE_KEYS.QUIZ_RESULT, data);

    const statistics = this.getStatisticData();
    statistics.quizzesCount++;
    statistics.questionsCount.total += QUESTIONS_SIZE;
    
    statistics.questionsCount.right = statistics.questionsCount.right + data.score;
    statistics.questionsCount.wrong = (statistics.questionsCount.wrong + (QUESTIONS_SIZE - data.score));

    statistics.time += +(data.seconds / SECONDS).toFixed(1);

    this.storage.saveToStorage(STORAGE_KEYS.CHART, statistics);
  }
}
