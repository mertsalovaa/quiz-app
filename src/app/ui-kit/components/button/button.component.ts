import { Component, Input, OnInit } from '@angular/core';
import { TextTypes } from '../../constants/text-types';

@Component({
  selector: 'app-ui-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() type: 'accent' | 'ghost' = 'accent';
  @Input() size: 'sm' | 'md' = 'sm';
  @Input() disabled: boolean = false;
  @Input() textType: TextTypes = 'P1';

  @Input()
  set iconState(value: 'next' | 'prev' | 'none') {
    this.iconPosition = value;
    this.updateIconStyles();
  }
  
  iconPosition: 'next' | 'prev' | 'none' = 'none';
  iconStyles: { [klass: string]: string | number } = {};
  imageSrc: string = 'chevron.svg';
  
  private readonly iconStateClassesMap = {
    next: { class: 'pr-3', rotate: '180deg' },
    prev: { class: 'flex-row-reverse pl-3', rotate: '' },
    none: { class: '', rotate: '' },
  };
  
  private readonly sizeClassesMap = {
    sm: 'py-1.5',
    md: 'py-3',
  };
  
  private readonly typeClassesMap = {
    accent: 'bg-accent enabled:hover:bg-accent disabled:bg-secondary border-transparent',
    ghost: 'border-accent enabled:hover:border-accent disabled:border-secondary',
  };

  get iconStateClasses(): string {
    return this.iconStateClassesMap[this.iconPosition].class;
  }
  
  get sizeClasses(): string {
    return this.sizeClassesMap[this.size];
  }
  
  get typeClasses(): string {
    return this.typeClassesMap[this.type];
  }
  
  get classes(): string {
    return [ this.iconStateClasses, this.sizeClasses, this.typeClasses ].join(' ');
  }

  private updateIconStyles(): void {
    this.iconStyles = {
      'width.px': 14,
      'height.px': 14,
      'transform': `rotate(${this.iconStateClassesMap[this.iconPosition].rotate})`,
    };
  }
}
