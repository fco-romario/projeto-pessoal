import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbStore {
  private readonly _state = signal<string[]>([]);

  breadcrumbs = computed(() => this._state());

  set(breadcrumb: string[]): void {
    this._state.set(breadcrumb);
  }
}
