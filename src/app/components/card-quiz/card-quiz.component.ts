import { Component, Input } from '@angular/core';
import {
  CardItemStyle,
  cardItemStyles,
} from './card-quiz.constants';

@Component({
  selector: 'app-ui-card-quiz',
  templateUrl: './card-quiz.component.html',
})
export class CardQuizComponent {
  @Input() name: string = '';
  @Input() id: number = 0;
  @Input() styles: CardItemStyle = cardItemStyles.accent;
}
