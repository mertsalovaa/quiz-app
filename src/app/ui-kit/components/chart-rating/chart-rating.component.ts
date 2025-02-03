import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions, createChartOptions, QuestionTypeModel } from './chart-rating.contants';
import { ChartModel } from '../../../services/statistics/chart.modal';

@Component({
  selector: 'app-ui-chart-rating',
  templateUrl: './chart-rating.component.html',
})
export class ChartRatingComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() data!: ChartModel;
  
  chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    const arr: QuestionTypeModel[] = [
      { name: 'right', value: this.data.questionsCount.right },
      { name: 'wrong', value: this.data.questionsCount.wrong },
    ];
    this.chartOptions = createChartOptions(arr);
  }
}
