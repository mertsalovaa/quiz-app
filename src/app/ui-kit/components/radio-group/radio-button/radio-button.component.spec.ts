import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypographyComponent } from '../../typography/typography.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;
  let debugElement: DebugElement;

  const testOption = 'test-option';

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonComponent, TypographyComponent ],
      imports: [ReactiveFormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should set attributes correctly', () => {
    component.text = testOption;
    component.control = new FormControl();
    fixture.detectChanges();

    const inputElement = debugElement.query(By.css('input[type=radio]')).nativeElement;
    
    expect(inputElement.getAttribute('id')).toBe(`radio-${testOption}`);
    expect(inputElement.getAttribute('ng-reflect-value')).toBe(testOption);
    expect(component.control instanceof FormControl).toBeTruthy();
  });

  it('click should change the FormControl value', () => {
    component.control = new FormControl();
    component.text = testOption;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = debugElement.query(By.css('input')).nativeElement;
    
    expect(component.control.value).toBeNull(); 

    inputElement.click(); 
    fixture.detectChanges();

    expect(component.control.value).toBe(testOption);
  });

  it('should set label with text', () => {
    component.text = testOption;
    component.control = new FormControl();
    fixture.detectChanges();

    const typographyElement = debugElement.query(By.directive(TypographyComponent)).nativeElement;

    expect(typographyElement.textContent).toBe(testOption);
  });
});
