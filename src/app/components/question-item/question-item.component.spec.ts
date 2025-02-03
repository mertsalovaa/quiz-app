import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionItemComponent } from './question-item.component';
import { DebugElement } from '@angular/core';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { RadioGroupComponent } from '../../ui-kit/components/radio-group/radio-group.component';
import { ButtonComponent } from '../../ui-kit/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionModel } from '../../services/question/question.model';
import { By } from '@angular/platform-browser';
import { expect } from '@jest/globals';
import { RadioButtonComponent } from '../../ui-kit/components/radio-group/radio-button/radio-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('QuestionItemComponent', () => {
  let fixture: ComponentFixture<QuestionItemComponent>;
  let component: QuestionItemComponent;
  let debugElement: DebugElement;

  const testData: QuestionModel = {
    type: true,
    difficulty: 'easy',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'How many plays is Shakespeare generally considered to have written?',
    correct_answer: '37',
    incorrect_answers: [ '18', '54', '25' ],
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionItemComponent, TypographyComponent, RadioGroupComponent, RadioButtonComponent, ButtonComponent ],
      imports: [ AngularSvgIconModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, CommonModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  function setData(): void {
    component.item = testData;
    component.options = [ ...testData.incorrect_answers, testData.correct_answer ];
    fixture.detectChanges();
  }

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should set variables correctly', () => {
    const formattedSpy = jest.spyOn(component, 'getFormattedText');
    setData();
    const itemElement = fixture.componentInstance;
    
    debugElement.triggerEventHandler('getFormattedText', {});
    expect(formattedSpy).toHaveBeenCalled();
    expect(formattedSpy).not.toBeNull();

    expect(fixture.nativeElement).not.toBeNull();
    expect(itemElement.item).toBe(testData);
  });
    
  it('should handle selected answer', () => {
    const selectedSpy = jest.spyOn(component, 'setSelectedAnswer');
    setData();

    const radioGroupElement = debugElement.query(By.directive(RadioGroupComponent));
      
    radioGroupElement.triggerEventHandler('getSelectedAnswer', testData.correct_answer);
    expect(selectedSpy).toHaveBeenCalledWith(testData.correct_answer);
  });

  it('should emit prev and next events correctly', () => {
    setData();
    
    component.radioGroup = { 
      isSelectedAnswer: jest.fn(() => true), 
    } as unknown as RadioGroupComponent;
    
    const prevEmitSpy = jest.spyOn(component.prev, 'emit');
    const nextEmitSpy = jest.spyOn(component.next, 'emit');
    
    component.handlePrev();
    component.handleNext();
    
    expect(component.radioGroup.isSelectedAnswer).toHaveBeenCalled();
    expect(prevEmitSpy).toHaveBeenCalled();
    expect(nextEmitSpy).toHaveBeenCalled();
  });
});
