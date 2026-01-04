import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person, PersonRequest } from '../interfaces/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly url = 'http://localhost:3000/people';

  private _http = inject(HttpClient);

  createPerson(person: PersonRequest) {
    return this._http.post<Person>(this.url, person);
  }

  update(person: Person): Observable<Person> {
    return this._http.put<Person>(`${this.url}/${person.id}`, person)
  }

  getPersonById(id: string): Observable<Person> {
    return this._http.get<Person>(`${this.url}/${id}`);
  }
}
