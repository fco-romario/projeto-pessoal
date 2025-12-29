import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserCredentials } from '../interfaces/user-credentials';
import { tap, switchMap, Observable, pipe } from 'rxjs';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { TokenLocalStorageStore } from '../stores/token-local-storage-store.service';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  private readonly _authService = inject(AuthService);
  private readonly _tokenLocalStorageStore = inject(TokenLocalStorageStore);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);
  
  login(payload: UserCredentials): Observable<User> {
    return this._authService.login(payload).pipe(this.creatUserSession());
  }

  refreshToken(token: string): Observable<User> {
    return this._authService.refreshToken(token).pipe(this.creatUserSession());
  }

  private creatUserSession() {
    return pipe(
      tap((response: AuthTokenResponse) => this._tokenLocalStorageStore.set(response.token)),
      switchMap((response: AuthTokenResponse) => this._authService.getCurrentUser(response.token)),
      tap((user: User) => this._loggedInUserStoreService.setUser(user)),
    );
  }
}
