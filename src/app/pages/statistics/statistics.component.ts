import { Component, OnInit } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { QUESTIONS_SIZE } from '../../utils/constants';
import { ChartModel } from '../../services/statistics/chart.modal';
import { StatisticService } from '../../services/statistics/statistics.service';
import { QuizResultModel } from '../../services/statistics/quiz-result.model';
import { chartDataText } from '../../test-data/chart.data';

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  imports: [UIKitModule],
})
export class StatisticsComponent implements OnInit {
  chartData!: ChartModel;
  quizResult!: QuizResultModel | null;
  size: number = QUESTIONS_SIZE;
  texts: string[] = chartDataText;
  
  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.chartData = this.statisticService.getStatisticData();
    this.quizResult = this.statisticService.getQuizResult();
  }
}
