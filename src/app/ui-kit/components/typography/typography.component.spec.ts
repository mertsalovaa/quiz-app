import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextTypes, textTypesClasses } from '../../constants/text-types';
import { TypographyComponent } from './typography.component';
import { By } from '@angular/platform-browser';
import { expect, jest, test } from '@jest/globals';

@Component({
  template: '<app-ui-typography [type]="testType" [highlightText]="testHighlight" >{{ testContent }}</app-ui-typography>',
})
class TestHostComponent {
  testType: TextTypes = 'H6';
  testContent: string = 'test-content';
  testHighlight: string = 'framed';
}

describe('TypographyComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let debugElement: DebugElement; 

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ TypographyComponent, TestHostComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component with not empty content', () => {
    expect(hostComponent).toBeTruthy();
    
    const textElement = debugElement.query(By.css('app-ui-typography')).nativeElement;
    expect(textElement.textContent).not.toBe(null);
  });

  it('should render correct HTML tag based on type input', () => {
    Object.entries(textTypesClasses).forEach(([ typeKey, typeClasses ]) => {
      hostComponent.testType = typeKey as TextTypes;
      fixture.detectChanges();

      const expectedTag = [ 'P1', 'P2', 'Label' ].includes(typeKey) ? 'p' : typeKey.toLowerCase();
    
      const element = debugElement.query(By.css(expectedTag));
      
      expect(element.nativeElement).toBeTruthy();
      expect(element.nativeElement.tagName).toBe(expectedTag.toUpperCase());
      expect(element.nativeElement.className).not.toStrictEqual(typeClasses);
    });
  });
});
