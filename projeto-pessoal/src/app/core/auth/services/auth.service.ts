import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../../../shared/user/interfaces/user';
import { UserService } from '../../../shared/user/services/user.service';

function generateToken(): string {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 20; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _userService = inject(UserService);

  login(payload: UserCredentials): Observable<AuthTokenResponse> {
  return this.getUserByUsername(payload.user).pipe(
    map(user => {
      if (
        user[0].password !== payload.password ||
        user[0].username !== payload.user
      ) {
        throw new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized'
        });
      }

      return { token: generateToken() };
    })
  );
}

  logout() {
    return of({});
  }
  
  getCurrentUser(token: string): Observable<User> {
    return of({ username: 'Romário', password: '123456', personId: '1' });
  }

  refreshToken(token: string): Observable<AuthTokenResponse> {
    return of({token: generateToken()});
  }

  getUserByUsername(username: string):Observable<User[]> {
    return this._userService.getUserByUsername(username);
  }
}
