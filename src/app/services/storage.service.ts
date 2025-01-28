import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
