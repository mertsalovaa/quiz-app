import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizzesCatalogComponent } from './quizzes-catalog.component';
import { DebugElement, Type } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { of } from 'rxjs';
import { mockCategories } from '../../services/category.service.spec';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../ui-kit/components/button/button.component';
import { TypographyComponent } from '../../ui-kit/components/typography/typography.component';
import { LinkComponent } from '../../ui-kit/components/link/link.component';
import { CardQuizComponent } from '../../ui-kit/components/card-quiz/card-quiz.component';
import { CardItemStyle } from '../../ui-kit/constants/card-item';
import { SpinnerComponent } from '../../ui-kit/components/spinner/spinner.component';

export function isComponentExist<T extends Type<any>>(debugElement: DebugElement, component: T): void {
  const elements = debugElement.queryAll(By.directive(component));
  expect(elements).toBeTruthy(); 

  elements.forEach((item) => {
    expect(item.nativeElement.textContent).not.toBeNull();
  });
}

describe('QuizzesCatalogComponent', () => {
  let fixture: ComponentFixture<QuizzesCatalogComponent>;
  let component: QuizzesCatalogComponent;
  let debugElement: DebugElement;
  let storeService: Partial<StoreService>;

  beforeEach(async() => {
    storeService = {
      getCategories: jest.fn(() => of(mockCategories.trivia_categories)),
      getLoadingCategories: jest.fn(() => of(false)),
      loadCategories: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ QuizzesCatalogComponent, UIKitModule, HttpClientTestingModule ],
      providers: [ provideMockStore(), 
        provideRouter([]),
        { provide: StoreService, useValue: storeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesCatalogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render children components correctly', () => {
    isComponentExist(debugElement, TypographyComponent);
    isComponentExist(debugElement, ButtonComponent);
    isComponentExist(debugElement, LinkComponent);
  });

  it('should call store service on ngOnInit', () => {
    expect(storeService.getCategories).toHaveBeenCalled();
    expect(storeService.getLoadingCategories).toHaveBeenCalled();
    expect(storeService.loadCategories).toHaveBeenCalled();
  });

  it('should get card styles for the quiz-card correctly', () => {
    const cardElement = debugElement.query(By.directive(CardQuizComponent));
    const expectedStyles: CardItemStyle = component.getCardStyle(0);

    expect(cardElement.componentInstance.styles).toBe(expectedStyles);
  });

  it('should categories$ and isLoading$ not to be empty', () => {
    expect(component.categories$).not.toBeNull();
    expect(component.isLoading$).not.toBeNull();
  });

  it('should show categories', () => {
    const cards = debugElement.queryAll(By.directive(CardQuizComponent));
    
    expect(cards.length).not.toBe(0); 
    
    cards.forEach((item, index) => {
      expect(item.componentInstance.name).toBe(
        mockCategories.trivia_categories[index].name
      );
      
      expect(item.componentInstance.id).toBe(
        mockCategories.trivia_categories[index].id
      );
    });
  });

  it('should show spinner if isLoading is true', () => {
    jest.spyOn(storeService, 'getLoadingCategories').mockReturnValue(of(true));
    
    component.ngOnInit(); 
    fixture.detectChanges(); 

    const spinner = debugElement.query(By.directive(SpinnerComponent));
    
    expect(spinner).toBeTruthy();
    expect(spinner.componentInstance.show).toBe(true);
  });
});
