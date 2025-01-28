import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() show: boolean = false;
}
