import { Component, Input } from '@angular/core';
import { TextTypes, textTypesClasses } from '../../constants/text-types';

@Component({
  selector: 'app-ui-typography',
  templateUrl: './typography.component.html',
})
export class TypographyComponent {
  @Input() type: TextTypes = 'P1';
  @Input() highlightText: 'none' | 'framed' | 'ellipse' = 'none';
  @Input() highlightColor: 'bg-error' | 'bg-warning' = 'bg-warning';
  classType: string = '';

  get classes(): string {
    if (textTypesClasses[this.type]) {
      this.classType = textTypesClasses[this.type];
    }
    return `[ ${this.classType} ${this.highlightTextStyle} flex flex-wrap break-words ]`;
  }

  get highlightTextStyle(): string {
    switch (this.highlightText) {
      case 'ellipse':
        return ' text-error';
      case 'framed':
        return `${this.highlightColor} text-${this.highlightColor == 'bg-warning' ? 'primary' : 'bright'} p-2`;
      default:
        return '';
    }
  }
}
