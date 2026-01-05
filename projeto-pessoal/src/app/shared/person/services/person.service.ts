import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person, PersonRequest } from '../interfaces/person';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly url = 'http://localhost:3000/people';

  private _http = inject(HttpClient);
  private _addressService = inject(AddressService);

  create(person: PersonRequest) {
    return this._http.post<Person>(this.url, person);
  }

  update(person: Person): Observable<Person> {
    return this._http.put<Person>(`${this.url}/${person.id}`, person)
  }

  getPersonWithAddresses(id: string): Observable<Person> {
  return this._http.get<Person>(
    `${this.url}/${id}?_embed=addresses`
  );
}

  getPersonById(id: string): Observable<Person> {
    return this._http.get<Person>(`${this.url}/${id}`);
  }

  //API
  savePerson(person: Person) {
    let addressesToSave = [...person.addresses!];
    person.addresses = [];

    addressesToSave = addressesToSave.map(address =>  {
      address.personId = person.id;
      return address;
    });

    const addressRequests = addressesToSave.map(address => {
      if(address.id) {
        return this._addressService.updateAddress(address);
      } else {
        delete address.id;
        return this._addressService.saveAddress(address);
      }
    });
    
    return forkJoin(addressRequests).pipe(
      switchMap(savedAddresses => {
        return this.update(person);
      })
    );
  }
}
