import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PersonService } from '../../../shared/person/services/person.service';
import { Person } from '../../../shared/person/interfaces/person';
import { LoggedInUserStoreService } from '../../../core/auth/stores/logged-in-user-store.service';

export const getPersonByIdResolver: ResolveFn<Person> = (route, state) => {
  const _personService = inject(PersonService);
  const _loggedInUserStore = inject(LoggedInUserStoreService);
  // const id = route.params['id']

  const id = _loggedInUserStore.currentUser()?.personId!;
  
  return _personService.getPersonById(id);
};
