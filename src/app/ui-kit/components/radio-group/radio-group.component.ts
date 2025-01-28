import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ui-radio-group',
  templateUrl: './radio-group.component.html',
})
export class RadioGroupComponent {
  @Output() getSelectedAnswer = new EventEmitter<string>();
  @Input() options: string[] = [];
  @Input() set setFormControl(selectedAnswer: string) {
    this.formControl.setValue(selectedAnswer);
    this.formControl.valueChanges.subscribe((value) => {
      this.getSelectedAnswer.emit(value);
    });
  }
  
  isNotification$ = new BehaviorSubject<boolean>(false);
  formControl: FormControl = new FormControl('', Validators.required);
  value: string | null = null;

  isSelectedAnswer(): boolean {
    if (this.formControl.invalid) {
      this.isNotification$.next(true);
      setTimeout(() => {
        this.isNotification$.next(false);
      }, 1500); 
      this.formControl.markAsTouched();
      return false;
    }
    return true;
  }
}
