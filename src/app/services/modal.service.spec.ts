import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ModalWindowService, ModalWindowState } from './modal.service';
import { ModalRoutes } from '../utils/modal-routes.enum';
import { DEFAULT_MODAL_DATA, MODAL_DATA } from '../utils/modal-data.constants';

describe('ModalWindowService', () => {
  let service: ModalWindowService;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    routerMock = {
      navigateByUrl: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [ ModalWindowService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(ModalWindowService);
  });

  it('should initialize with default modal state', () => {
    const initialState: ModalWindowState = {
      visibility: false,
      choice: false,
      data: DEFAULT_MODAL_DATA,
    };

    expect(service.modalState$.getValue()).toEqual(initialState);
  });

  it('should set modal-window data', () => {
    service.setModalData(ModalRoutes.QuizzesCatalog);

    service.modalWindowData$.subscribe({
      next: (value) => {
        expect(value).toEqual(MODAL_DATA[ModalRoutes.QuizzesCatalog]); 
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });
  });

  it('should return default modal data if path not found', () => {
    service.setModalData('/undefined-path');

    service.modalWindowData$.subscribe({
      next: (value) => {
        expect(value).toEqual(DEFAULT_MODAL_DATA); 
      },
      error: () => {
        fail('Test should not reach error handler');
      },
    });
  });

  it('should set modal-window state', () => {
    service.setModalState(DEFAULT_MODAL_DATA.link);

    const currentState = service.modalState$.getValue();
    
    expect(currentState).toEqual({
      visibility: true,
      choice: false,
      data: DEFAULT_MODAL_DATA,
    });
  });

  it('should handle modal action if the user confirms moving', () => {
    service.modalState$.next({
      visibility: true,
      choice: false,
      data: MODAL_DATA[ModalRoutes.QuizzesCatalog],
    });

    service.handleModalAction(true);

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(ModalRoutes.QuizzesCatalog);
    expect(service.modalState$.getValue().choice).toBe(true);
  });

  it('should reload the page if the user wants to refresh a page', () => {
    const reloadSpy = jest.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadSpy },
      writable: true,
    });
  
    service.modalState$.next({
      visibility: true,
      choice: false,
      data: { ...MODAL_DATA[ModalRoutes.Quiz], link: ModalRoutes.Refresh },
    });
  
    service.handleModalAction(true);
  
    expect(reloadSpy).toHaveBeenCalled();
  
    Object.defineProperty(window, 'location', {
      value: location,
      configurable: true,
    });
  });  

  it('should navigate to statistics page if nextRoute is finish path', () => {
    service.modalState$.next({
      visibility: true,
      choice: false,
      data: MODAL_DATA[ModalRoutes.Finish],
    });

    service.handleModalAction(true);

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(ModalRoutes.Statistics);
  });

  it('should close the modal window if the user cancels moving', () => {
    service.modalState$.next({
      visibility: true,
      choice: false,
      data: DEFAULT_MODAL_DATA,
    });

    service.handleModalAction(false);

    const currentState = service.modalWindowState$;
    
    expect(currentState).toBe(false);
  });

  it('should reset modal state when closeModal is called', () => {
    service.modalState$.next({
      visibility: true,
      choice: true,
      data: DEFAULT_MODAL_DATA,
    });

    service.closeModal();

    const currentState = service.modalState$.getValue();
    expect(currentState.visibility).toBe(false);
    expect(currentState.choice).toBe(false);
    expect(currentState.data).toEqual(DEFAULT_MODAL_DATA);
  });
});
