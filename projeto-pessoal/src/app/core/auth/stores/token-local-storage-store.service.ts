import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from './local-storage-store';

@Injectable({
  providedIn: 'root',
})
export class TokenLocalStorageStore {

    private localStorageToken = inject(LocalStorageToken);

    private readonly key: string = 'auth-token';

    set(token: string) {
      this.localStorageToken.setItem(this.key, token);
    }

    get(): string | null {
      return this.localStorageToken.getItem(this.key);
    }

    has(): boolean {
      return Boolean(this.get());
    }

    remove(): void {
      this.localStorageToken.removeItem(this.key);
    }
}
