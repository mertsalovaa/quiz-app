import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input() link: string = '';
}
