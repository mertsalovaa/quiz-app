import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  
  const key = 'testKey';
  const undefinedKey = 'nonExistentKey';
  const storedValue: string[] = ['data'];
  const defaultValue = 'defaultValue';
  const invalidFormat = 'invalidJSON';

  beforeEach(() => {
    service = new StorageService();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });
  });

  it('should return default value if item not found in localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    const result = service.getFromStorage(undefinedKey, defaultValue);

    expect(result).toBe(defaultValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(undefinedKey);
  });

  it('should parse stored JSON and return it from localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(storedValue));

    const result = service.getFromStorage(key, defaultValue);

    expect(result).toEqual(storedValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should return default value if JSON parse fails', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(invalidFormat);

    const result = service.getFromStorage(key, defaultValue);

    expect(result).toBe(defaultValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should save value to localStorage', () => {
    service.saveToStorage(key, storedValue[0]);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(storedValue[0]));
  });
});
