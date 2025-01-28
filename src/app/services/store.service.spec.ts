import { Store } from '@ngrx/store';
import { StoreService } from './store.service';
import * as CategoryActions from '../../store/category/category.actions';
import * as QuestionActions from '../../store/question/question.actions';
import { AppState } from '../../store/app.store';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { questions$ } from './statistics.service.spec';
import { mockCategories } from './category.service.spec';

jest.mock('@ngrx/store');

jest.mock('../../store/category/category.actions', () => ({
  loadCategories: jest.fn(() => ({ type: '[Category] Load Categories' })),
}));
  
jest.mock('../../store/question/question.actions', () => ({
  loadQuestions: jest.fn(categoryId => ({ type: '[Question] Load Questions', categoryId })),
}));

describe('StoreService', () => {
  let service: StoreService;
  let store: jest.Mocked<Store<AppState>>;

  const categoryId: number = 11;

  beforeEach(() => {
    const mockStore = {
      select: jest.fn(),
      dispatch: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [ StoreService, { provide: Store, useValue: mockStore }],
    });
    service = TestBed.inject(StoreService);
    store = TestBed.inject(Store) as jest.Mocked<Store<AppState>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Selectors', () => {
    it('should select questions from the store', (done) => {
      store.select.mockReturnValue(questions$);
    
      service.getQuestions().subscribe((questions) => {
        questions$.subscribe((expectedQuestions) => {
          expect(questions).toEqual(expectedQuestions); 
          done();
        });
      });
    
      expect(store.select).toHaveBeenCalled(); 
    });
      
    it('should select categories from the store', (done) => {
      store.select.mockReturnValue(of(mockCategories));

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(mockCategories.trivia_categories); 
        done();
      });
      done();

      expect(store.select).toHaveBeenCalled();
    });

    it('should select loadingCategories from the store', (done) => {
      store.select.mockReturnValue(of(true));
      service.getLoadingCategories().subscribe((isLoading) => {
        expect(isLoading).toBe(true);
        done();
      });
      expect(store.select).toHaveBeenCalled();
    });

    it('should select loadingQuestions from the store', (done) => {
      store.select.mockReturnValue(of(false));
    
      service.getLoadingQuestions().subscribe((isLoading) => {
        expect(isLoading).toBe(false); 
        done();
      });
    
      expect(store.select).toHaveBeenCalled();
    });

    it('should return an empty array if questions are not loaded', (done) => {
      store.select.mockReturnValue(of([]));
    
      service.getQuestions().subscribe((questions) => {
        expect(questions).toEqual([]);
        done();
      });
    });
    
    it('should return an empty array if categories are not loaded', (done) => {
      store.select.mockReturnValue(of([]));
    
      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual([]);
        done();
      });
    });
  });

  describe('Dispatch actions', () => {
    it('should dispatch loadCategories action', () => {
      service.loadCategories();
      expect(store.dispatch).toHaveBeenCalledWith(
        CategoryActions.loadCategories() 
      );
    });
    
    it('should dispatch loadQuestions action by categoryId', () => {
      service.loadQuestions(categoryId);
      expect(store.dispatch).toHaveBeenCalledWith(
        QuestionActions.loadQuestions({ categoryId })
      );
    });
  });
});
