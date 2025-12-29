import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { User } from '../interfaces/user';

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

  login(payload: UserCredentials): Observable<AuthTokenResponse> {
    if(payload.user === 'romario@gmail.com' && payload.password === '123456') {
      return of({token: generateToken()});
    }

    return throwError(
      () => new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized'  
      })
    );
  }

  logout() {
    return of({});
  }
  
  getCurrentUser(token: string): Observable<User> {
    return of({ username: 'Romário'});
  }

  refreshToken(token: string): Observable<AuthTokenResponse> {
    return of({token: generateToken()});
  }
}
