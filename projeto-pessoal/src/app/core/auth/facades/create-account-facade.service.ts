import { inject, Injectable } from '@angular/core';
import { PersonService } from '../../../shared/person/services/person.service';
import { UserService } from '../../../shared/user/services/user.service';
import { Observable, switchMap } from 'rxjs';
import { User, userRequest } from '../../../shared/user/interfaces/user';
import { PersonRequest } from '../../../shared/person/interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountFacadeService {
  private readonly _userService = inject(UserService);
  private readonly _personService = inject(PersonService);

  createAccount(person: PersonRequest, userRequest: userRequest): Observable<User> {
    return this._personService.create(person).pipe(
      switchMap((createPerson) => {
        const user = {
          ...userRequest,
          personId: createPerson.id,
        }
        return this._userService.createUser(user);
      })
    )
  }
}
