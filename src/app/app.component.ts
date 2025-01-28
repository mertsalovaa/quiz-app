import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIKitModule } from './ui-kit/ui-kit.module';
import { StatisticService } from './services/statistics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, UIKitModule ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'quiz-app';

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.statisticService.initDefaultStatistic();
  }
}
