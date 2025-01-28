import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { API_ENDPOINTS, QUESTIONS_SIZE } from '../utils/constants';

export const mockCategories = {
  trivia_categories: Array.from({ length: QUESTIONS_SIZE }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
  })),
};

describe('CategoryService', () => {
  let service: CategoryService;
  let controller: HttpTestingController;

  const emptyResponse = { trivia_categories: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should call API and return the correct category list', () => {
    service.get().subscribe({
      next: (categories) => {
        expect(categories.length).toEqual(QUESTIONS_SIZE);
        expect(categories[0].id).toBe(1); 
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });

    const req = controller.expectOne(API_ENDPOINTS.CATEGORY_URL);
    
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCategories);
  });

  it('should call API and return an empty category list', () => {
    service.get().subscribe({
      next: (categories) => {
        expect(categories.length).toEqual(0);
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });

    const req = controller.expectOne(API_ENDPOINTS.CATEGORY_URL);
    
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);
  });

  it('should throw an error if API call fails', () => {
    service.get().subscribe({
      next: () => {
        fail('Test should not reach success handler');
      },
      error: (error) => {
        expect(error.message).toBe(
          'An error occurred. Please reload the page or try later.',
        );
        expect(error).toBeTruthy(); 
      },
    });

    const req = controller.expectOne(API_ENDPOINTS.CATEGORY_URL);
    
    expect(req.request.method).toBe('GET');
    
    req.flush(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
