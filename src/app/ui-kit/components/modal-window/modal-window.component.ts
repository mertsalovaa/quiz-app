import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalWindowModel } from '../../../services/modal-window/modal.model';

@Component({
  selector: 'app-ui-modal-window',
  templateUrl: './modal-window.component.html',
})
export class ModalWindowComponent {
  @Output() confirm = new EventEmitter<boolean>();
  @Input() data: ModalWindowModel = { page: '', link: '', text: '', title: '' };

  onConfirm(): void {
    this.confirm.emit(true);
  }
  
  onCancel(): void {
    this.confirm.emit(false);
  }
}
