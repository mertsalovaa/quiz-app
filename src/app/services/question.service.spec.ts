import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_ENDPOINTS, QUESTIONS_SIZE } from '../utils/constants';
import { QuestionModel } from './model/question.model';
import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let controller: HttpTestingController;

  const categoryId = 11;
  const response = {
    results: new Array(QUESTIONS_SIZE).fill({}) as QuestionModel[],
  };
  const api = `${API_ENDPOINTS.QUESTION_URL}category=${categoryId}&type=multiple`;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService],
    });

    service = TestBed.inject(QuestionService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should call API and return the correct questions array', () => {
    service.getQuestions(categoryId).subscribe({
      next: (questions) => {
        expect(questions.length).toEqual(QUESTIONS_SIZE);
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });

    const req = controller.expectOne(request => request.url.includes(API_ENDPOINTS.QUESTION_URL));
    
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    
    const url = req.request.urlWithParams;  
    
    expect(url).toContain(`category=${categoryId}`);
    expect(url).toContain('type=multiple');
  
    req.flush(response);
  });

  it('should call API and return an empty questions array', () => {
    service.getQuestions(categoryId).subscribe({
      next: (questions) => {
        expect(questions.length).toEqual(0);
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });

    const req = controller.expectOne(api);
    
    expect(req.request.method).toBe('GET');
    req.flush({ result: [] });
  });

  it('should throw an error if API call fails', () => {
    service.getQuestions(categoryId).subscribe({
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

    const req = controller.expectOne(api);
    
    expect(req.request.method).toBe('GET');
    req.flush(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
