import { ErrorHandler, Injectable } from '@angular/core';
import { TIME_COUNTER } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService implements ErrorHandler {
  errors: string[] = [];

  handleError(error: any): void {
    const errorMessage = this.formatError(error);
    this.errors.push(errorMessage);
    this.showError(errorMessage);
  }

  private formatError(error: any): string {
    if (error instanceof Error) {
      return error.message;
    } if (typeof error === 'string') {
      return error;
    } 
    return 'An error occurred. Please reload the page or try later.';
  }

  private showError(message: string): void {
    const alert = document.createElement('div');
    const icon = document.createElement('img');
    
    icon.src = 'error-notification-icon.svg';
    icon.className = 'w-5 h-5 mr-2';
    alert.className = 'flex items-center fixed right-4 p-3 pr-5 bg-error text-bright border-4 border-error rounded z-50';
    alert.textContent = message;
    
    alert.appendChild(icon);
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, TIME_COUNTER); 
  }
}
