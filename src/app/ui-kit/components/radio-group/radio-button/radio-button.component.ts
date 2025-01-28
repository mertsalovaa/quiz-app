import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ui-radio-button',
  templateUrl: './radio-button.component.html',
})
export class RadioButtonComponent {
  @Input() text: string = '';
  @Input() control!: FormControl;
}
