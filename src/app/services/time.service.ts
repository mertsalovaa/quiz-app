import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private startTime: number = 0;
  private timer!: any;
  
  get updateElapsedTime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  startTest(): void {
    this.startTime = Date.now(); 
    this.timer = setInterval(() => {
      this.updateElapsedTime;
    }, 1000);
  }

  finishTest(): number {
    clearInterval(this.timer);
    return this.updateElapsedTime;
  }
  
  formatTime(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    }
    return `${seconds} sec`;
  }
}
