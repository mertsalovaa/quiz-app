import { Injectable } from '@angular/core';
import { ModalWindowModel } from './modal.model';
import { ModalRoutes } from '../../ui-kit/components/modal-window/modal-window.routes.enum';
import { DEFAULT_MODAL_DATA, MODAL_DATA } from '../../ui-kit/components/modal-window/modal-window.constants';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface ModalWindowState {
  visibility: boolean;
  choice: boolean;
  data: ModalWindowModel;
}

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  modalState$ = new BehaviorSubject<ModalWindowState>({
    visibility: false,
    choice: false,
    data: DEFAULT_MODAL_DATA,
  });

  get modalWindowState$(): boolean {
    return this.modalState$.getValue().visibility;
  }

  get modalWindowData$(): Observable<ModalWindowModel> {
    return this.modalState$.asObservable().pipe(map(state => state.data));
  }

  constructor(private router: Router) {}

  setModalData(path: string): ModalWindowModel {
    const updatedPath = path.trim();
    return MODAL_DATA[updatedPath] || DEFAULT_MODAL_DATA;
  }

  setModalState(path: string): void {
    const modalData = this.setModalData(path);
    this.modalState$.next({
      visibility: true,
      choice: false,
      data: modalData,
    });
  }

  handleModalAction(confirm: boolean): void {
    if (confirm) {
      this.modalState$.next({
        ...this.modalState$.getValue(),
        choice: true,
      });

      const nextRoute = this.modalState$.getValue().data.link;
      if (nextRoute === ModalRoutes.Refresh) {
        window.location.reload();
      } else if (nextRoute === ModalRoutes.Finish) {
        this.router.navigateByUrl(ModalRoutes.Statistics);
      } else {
        this.router.navigateByUrl(nextRoute);
      }
    } else {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modalState$.next({
      visibility: false,
      choice: false,
      data: DEFAULT_MODAL_DATA,
    });
  }
}
