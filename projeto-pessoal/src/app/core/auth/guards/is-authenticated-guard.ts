import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { TokenLocalStorageStore } from '../stores/token-local-storage-store.service';

export const isAuthenticatedGuardGuard: CanActivateFn = (route, state) => {
  const _loggedInUserStoreService = inject(LoggedInUserStoreService);
  const _tokenLocalStorageStore = inject(TokenLocalStorageStore);

  if(_tokenLocalStorageStore.has()) {
    return true;
  }

  const _router = inject(Router);
  // const urlTree = _router.parseUrl('/auth/login');
  const urlTree = _router.createUrlTree(['/auth/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
  
  return new RedirectCommand(urlTree);
};
