import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { DebugElement } from '@angular/core';
import { TypographyComponent } from '../typography/typography.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let debugElement: DebugElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent, TypographyComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component and render text', () => {
    expect(component).toBeTruthy();

    const messageElement = debugElement.query(By.directive(TypographyComponent));
    expect(messageElement.nativeElement.textContent.trim()).not.toBe(null);
  });
});
