import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserStoreService {
  private readonly _state = signal<User | null>(null);

  currentUser = computed(() => this._state());

  isLoggedIn = computed(() => Boolean(this._state()));

  setUser(user: User): void {
    this._state.set(user);
  }

  logout(): void {
    this._state.set(null);
  }
}
