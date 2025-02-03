import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-ui-radio-group',
  templateUrl: './radio-group.component.html',
})
export class RadioGroupComponent implements OnInit, OnDestroy {
  @Output() getSelectedAnswer = new EventEmitter<string>();
  @Input() options: string[] = [];
  @Input() set setFormControl(selectedAnswer: string) {
    this.formControl.setValue(selectedAnswer, { emitEvent: false });
  }

  private subscription!: Subscription;

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

  ngOnInit(): void {
    this.subscription = this.formControl.valueChanges.subscribe((value) => {
      this.getSelectedAnswer.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
