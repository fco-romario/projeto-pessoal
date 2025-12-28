import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { TokenLocalStorageStore } from '../stores/token-local-storage-store.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacadeService {
  private _authService = inject(AuthService);
  private _tokenLocalStorageStore = inject(TokenLocalStorageStore);
  private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  
  logout() {
    return this._authService.logout()
      .pipe(
        tap(() => this._tokenLocalStorageStore.remove()),
        tap(() => this._loggedInUserStoreService.logout()),
      );
  }
}
