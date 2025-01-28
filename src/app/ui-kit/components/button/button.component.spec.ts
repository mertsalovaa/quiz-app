import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypographyComponent } from '../typography/typography.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;
  let debugElement: DebugElement;

  const testBtnText = 'Test Button Text';
  const nextSmAccentBtnClasses = 'pr-3 py-1.5 bg-accent enabled:hover:bg-accent disabled:bg-secondary border-transparent';
  const prevMdGhostBtnClasses = 'flex-row-reverse pl-3 py-3 border-accent enabled:hover:border-accent disabled:border-secondary';

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent, TypographyComponent ],
      imports: [ AngularSvgIconModule.forRoot(), HttpClientTestingModule ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should set label with text', () => {
    component.textType = 'P1';

    fixture.nativeElement.querySelector('app-ui-typography')!.innerHTML = testBtnText;
    fixture.detectChanges();
  
    const typographyElement = debugElement.query(By.directive(TypographyComponent));
    
    expect(typographyElement).toBeTruthy();
    expect(typographyElement.nativeElement.textContent).toBe(testBtnText);
  });

  it('should render next-small-accent button with classes', () => {
    component.iconState = 'next';
    component.size = 'sm';
    component.type = 'accent';
    fixture.detectChanges();

    expect(component.classes).toBe(nextSmAccentBtnClasses);
  });

  it('should render prev-medium-ghost button with classes', () => {
    component.iconState = 'prev';
    component.size = 'md';
    component.type = 'ghost';
    fixture.detectChanges();

    expect(component.classes).toBe(prevMdGhostBtnClasses);
  });

  it('should render disabled button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });
});
