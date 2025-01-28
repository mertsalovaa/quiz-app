import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardQuizComponent } from './card-quiz.component';
import { DebugElement } from '@angular/core';
import { TypographyComponent } from '../typography/typography.component';
import { LinkComponent } from '../link/link.component';
import { By } from '@angular/platform-browser';
import { CategoryModel } from '../../../services/model/category.model';
import { cardItemStyles } from '../../constants/card-item';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expect } from '@jest/globals';

describe('CardQuizComponent', () => {
  let fixture: ComponentFixture<CardQuizComponent>;
  let component: CardQuizComponent;
  let debugElement: DebugElement;

  const testData: CategoryModel = {
    id: 10,
    name: 'Test Category',
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuizComponent, TypographyComponent, LinkComponent ],
      imports: [ AngularSvgIconModule.forRoot(), HttpClientTestingModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardQuizComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render component children and styles correctly', () => {
    component.name = testData.name;
    component.id = testData.id;
    component.styles = cardItemStyles.accent;

    fixture.detectChanges();
    
    const expectedHoverClass = component.styles.textColor === 'text-primary' 
      ? 'hover:text-accent' 
      : 'hover:text-warning';

    const nameElement = debugElement.query(By.css('app-ui-typography[type="H6"]')).nativeElement;
    const linkElement = debugElement.query(By.css('app-ui-link')).nativeElement;
    const iconElement = debugElement.query(By.css('svg-icon')).nativeElement;

    expect(nameElement.textContent).toBe(testData.name);
    expect(nameElement.getAttribute('ng-reflect-class')).not.toStrictEqual([ component.styles.textColor, expectedHoverClass ]);
    
    expect(linkElement.getAttribute('ng-reflect-link')).toBe(`/quiz/${testData.id}`);
    expect(iconElement.getAttribute('ng-reflect-src')).toBe(cardItemStyles.accent.icon);
  });
});
