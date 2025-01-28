import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
})
export class StatisticCardComponent {
  @Input() value: number | string = '';
  @Input() label: string = '';
  @Input() iconClass: string = '';
}
