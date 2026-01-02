import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = 'http://localhost:3000/users';

  private _http = inject(HttpClient);

  createUser(user: User) { 
    return this._http.post(this.url, user);
  }
}
