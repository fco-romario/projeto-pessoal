import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person, PersonCreate } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly url = 'http://localhost:3000/people';

  private _http = inject(HttpClient);

  createPerson(person: PersonCreate) {
    return this._http.post<Person>(this.url, person);
  }
}
