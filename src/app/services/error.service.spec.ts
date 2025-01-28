/* eslint-disable dot-notation */
import { ErrorHandleService } from './error.service';

describe('ErrorHandleService', () => {
  let service: ErrorHandleService;
  let mockCreateElement: jest.Mock;

  const errorText = 'An error occurred. Please reload the page or try later.';
  const alertClassNames = 'flex items-center fixed right-4 p-3 pr-5 bg-error text-bright border-4 border-error rounded z-50';
  const iconSrc = 'error-notification-icon.svg';
  const iconClassNames = 'w-5 h-5 mr-2';

  beforeEach(() => {
    service = new ErrorHandleService();
    mockCreateElement = document.createElement as jest.Mock;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should add error to errors array', () => {
    const error = new Error(errorText);
    const errorsLength = service.errors.length;

    service.handleError(error);
    expect(service.errors.length).toBe(errorsLength + 1);
    expect(service.errors).toContain(errorText);
  });

  it('should format the error if the error text is instance of Error', () => {
    const errorInstance = new Error(errorText);
    const result = service['formatError'](errorInstance);
    expect(result).toBe(errorText);
  });

  it('should format the error if the error text is string', () => {
    const result = service['formatError'](errorText);
    expect(result).toBe(errorText);
  });

  it('should return a default error text for unknown types', () => {
    const result = service['formatError']({} as any);
    expect(result).toBe(errorText);
  });

  it('should create and remove error notification after 5 seconds', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'clearInterval');

    const mockQuerySelector = jest.fn((selector: string) => {
      if (selector === 'img') {
        return { src: iconSrc, className: iconClassNames };
      }
      return null;
    });
    
    const mockCreateElement = (): any => ({
      appendChild: jest.fn(),
      remove: jest.fn(),
      className: '',
      textContent: '',
      querySelector: mockQuerySelector,
    });

    const createElementSpy = jest
    .spyOn(document, 'createElement')
    .mockImplementation(mockCreateElement);

    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation();

    service['showError'](errorText);
    
    const alertElement = createElementSpy.mock.results[0].value;
    const icon = alertElement.querySelector('img');

    expect(createElementSpy).toHaveBeenCalledWith('div');
    expect(createElementSpy).toHaveBeenCalledWith('img');

    expect(icon.src).toContain(iconSrc);
    expect(icon.className).toBe(iconClassNames);
    
    expect(alertElement.className).toBe(alertClassNames);
    expect(alertElement.textContent).toBe(errorText);

    expect(appendChildSpy).toHaveBeenCalledWith(alertElement);

    jest.advanceTimersByTime(5000);
    
    expect(alertElement.remove).toHaveBeenCalled();
    jest.useRealTimers(); 
  });
});
