import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { DebugElement } from '@angular/core';
import { LinkComponent } from '../../ui-kit/components/link/link.component';
import { ButtonComponent } from '../../ui-kit/components/button/button.component';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { By } from '@angular/platform-browser';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { isComponentExist } from '../quizzes-catalog/quizzes-catalog.component.spec';

describe('MainComponent', () => {
  let fixture: ComponentFixture<MainComponent>;
  let component: MainComponent;
  let debugElement: DebugElement;

  const testLink: string = '/quizzes-catalog';
  const testBtnStyles: {size: string, pos: string} = {
    size: 'md', pos: 'next',
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ MainComponent, UIKitModule, HttpClientTestingModule ],
      providers: [ provideMockStore(), provideRouter([]) ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render children components correctly', () => {
    const btnElement = debugElement.query(By.directive(ButtonComponent));
    isComponentExist(debugElement, TypographyComponent);
    isComponentExist(debugElement, ButtonComponent);
    isComponentExist(debugElement, LinkComponent);

    expect(btnElement.componentInstance.size).toBe(testBtnStyles.size);
    expect(btnElement.componentInstance.iconPosition).toBe(testBtnStyles.pos);
  });
});
