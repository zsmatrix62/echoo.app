import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class WebStorageServiceService {
  store = inject(LOCAL_STORAGE);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  get(key: string): any | null {
    const value = this.store.getItem(key);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (_) {
      return value.toString();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  set(key: string, value: any) {
    try {
      value = JSON.stringify(value);
    } catch (_) {
      value = value.toString();
    }
    this.store.setItem(key, value);
  }
}
