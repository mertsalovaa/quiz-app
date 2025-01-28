import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypographyComponent } from '../typography/typography.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let debugElement: DebugElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent, TypographyComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner and his children if show is true', () => {
    component.show = true;
    fixture.detectChanges();

    const spinnerElement = debugElement.query(By.css('[role="status"]'));
    const iconElement = debugElement.query(By.css('svg'));
    const textElement = debugElement.query(By.directive(TypographyComponent));
    
    expect(spinnerElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
    expect(textElement.nativeElement.textContent.trim()).toContain('Loading');
  });

  it('should not render spinner if show is false', () => {
    component.show = false;
    fixture.detectChanges();

    const spinnerElement = debugElement.query(By.css('[role="status"]'));
    expect(spinnerElement).toBeFalsy();
  });
});
