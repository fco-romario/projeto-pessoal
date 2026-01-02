import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = 'http://localhost:3000/users';

  private _http = inject(HttpClient);

  createUser(user: User): Observable<User> { 
    return this._http.post<User>(this.url, user);
  }
}
