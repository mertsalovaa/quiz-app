import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  message: string = 'Please select an option to continue the quiz';
}
