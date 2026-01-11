import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingStore {
  private readonly _state = signal<boolean>(false);

  // isLoading = computed(() => this._state());

  isLoading = this._state.asReadonly();
  private activeRequests = 0;
  
  show(): void {
    if (this.activeRequests === 0) this._state.set(true);
    
    this.activeRequests++;
  }

  hide(): void {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this._state.set(false);
    }
  }
}
