import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { NotificationComponent } from '../notification/notification.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TypographyComponent } from '../typography/typography.component';

describe('RadioGroupComponent', () => {
  let fixture: ComponentFixture<RadioGroupComponent>;
  let component: RadioGroupComponent;
  let debugElement: DebugElement;

  const testOptions: string[] = [
    'Option1', 'Option2', 'Option3', 'Option4',
  ];

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RadioGroupComponent, RadioButtonComponent, NotificationComponent, TypographyComponent ],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers(); 
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should set radio buttons for each option', () => {
    component.options = testOptions;
    fixture.detectChanges();

    const radioButtons = debugElement.queryAll(By.css('app-ui-radio-button'));
    expect(radioButtons.length).toBe(testOptions.length);
  });

  it('should init valid form control', () => {
    component.formControl = new FormControl('', Validators.required);

    component.setFormControl = testOptions[0];
    fixture.detectChanges();

    expect(component.formControl.value).toBe(testOptions[0]);
  });

  it('should get selected value if user choose another option', () => {
    jest.spyOn(component.getSelectedAnswer, 'emit');
    component.options = testOptions;
    component.setFormControl = testOptions[0];
    fixture.detectChanges();

    component.formControl.setValue(testOptions[1]);
    fixture.detectChanges();

    expect(component.getSelectedAnswer.emit).toHaveBeenCalledWith(testOptions[1]);
  });

  it('should show notification if user do not choose any option', (done) => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout'); 

    component.options = testOptions;
    fixture.detectChanges();

    expect(component.isNotification$.value).toBe(false); 

    expect(component.isSelectedAnswer()).toBe(false); 
    expect(component.isNotification$.value).toBe(true); 

    jest.advanceTimersByTime(1500);

    expect(component.isNotification$.value).toBe(false);
    done();
    expect(setTimeout).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('should not show notification if form is valid', () => {
    component.options = testOptions;
    component.setFormControl = testOptions[0];
    fixture.detectChanges();

    expect(component.isSelectedAnswer()).toBe(true); 
    expect(component.isNotification$.value).toBe(false);
  });
});
