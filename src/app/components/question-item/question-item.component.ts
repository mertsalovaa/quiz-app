import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuestionModel } from '../../services/question/question.model';
import { OPTIONS_COUNT, QUESTIONS_SIZE, TEXT_PARTS_COUNT } from '../../utils/constants';
import { RadioGroupComponent } from '../../ui-kit/components/radio-group/radio-group.component';

@Component({
  selector: 'app-ui-question-item',
  templateUrl: './question-item.component.html',
})
export class QuestionItemComponent {
  @Input() item: QuestionModel = { question: '', type: false, difficulty: '', category: '', correct_answer: '', incorrect_answers: [] };
  @Input() options: string[] = new Array<string>(OPTIONS_COUNT);
  @Input() id: number = 0;
  @Input() selectedAnswer: string = '';
  @Output() next = new EventEmitter<void>(); 
  @Output() prev = new EventEmitter<void>(); 
  @Output() getSelectedAnswer = new EventEmitter<string>(); 
  @ViewChild('radioGroup') radioGroup!: RadioGroupComponent;
  
  size: number = QUESTIONS_SIZE;
  
  images: string[] = [
    'avatars/Profile-1.svg',
    'avatars/Profile-2.svg',
    'avatars/Profile.svg',
  ];  
  
  setSelectedAnswer(value: string): void {
    this.getSelectedAnswer.emit(value);
  } 

  get buttonTextLg(): {prev: string, next: string} {
    return {
      prev: 'Prev question',
      next: this.id === this.size ? 'Finish' : 'Next question',
    };
  }

  get buttonTextSm(): {prev: string, next: string} {
    return {
      prev: 'Prev',
      next: this.id === this.size ? 'Finish' : 'Next',
    };
  }

  handlePrev(): void {
    this.prev.emit();
  }
  
  handleNext(): void {
    if (this.radioGroup.isSelectedAnswer()) {
      this.next.emit();
    }
  }

  getFormattedText(): { start: string, middle: string, end: string } {
    const question = this.item.question;
    const split = Math.floor(question.length / TEXT_PARTS_COUNT);
  
    const startEnd = question.indexOf(' ', split);
    const middleStart = startEnd + 1;
    const middleEnd = question.lastIndexOf(' ', question.length - split);
  
    return {
      start: question.slice(0, startEnd),
      middle: question.slice(middleStart, middleEnd),
      end: question.slice(middleEnd),
    };
  }
}
