import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalWindowComponent } from './modal-window.component';
import { DebugElement } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TypographyComponent } from '../typography/typography.component';
import { By } from '@angular/platform-browser';
import { ModalWindowModel } from '../../../services/model/modal.model';
import { DEFAULT_MODAL_DATA } from '../../../utils/modal-data.constants';

describe('ModalWindowComponent', () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;
  let debugElement: DebugElement;

  const mockData: ModalWindowModel = DEFAULT_MODAL_DATA;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowComponent, ButtonComponent, TypographyComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render children of components', () => {
    component.data = DEFAULT_MODAL_DATA;
    fixture.detectChanges();

    const titleElement = debugElement.query(By.css('app-ui-typography[type="H6"]')).nativeElement;
    const textElement = debugElement.query(By.css('app-ui-typography[type="P1"]')).nativeElement;

    expect(titleElement.textContent).toBe(DEFAULT_MODAL_DATA.title);
    expect(textElement.textContent).toBe(DEFAULT_MODAL_DATA.text);
  });

  it('should emit correct values to confirm and cancel', () => {
    const emitSpy = jest.spyOn(component.confirm, 'emit');

    component.onConfirm();
    expect(emitSpy).toHaveBeenCalledWith(true);

    component.onCancel();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should handle button click events correctly', () => {
    const confirmSpy = jest.spyOn(component, 'onConfirm');
    const cancelSpy = jest.spyOn(component, 'onCancel');

    component.data = DEFAULT_MODAL_DATA;
    fixture.detectChanges();

    const backBtn = debugElement.query(By.css('app-ui-button[type="accent"]'));
    backBtn.triggerEventHandler('click', {});
    expect(cancelSpy).toHaveBeenCalled();

    const goToBtn = debugElement.query(By.css('app-ui-button[type="ghost"]'));
    goToBtn.triggerEventHandler('click', {});
    expect(confirmSpy).toHaveBeenCalled();
  });
});
