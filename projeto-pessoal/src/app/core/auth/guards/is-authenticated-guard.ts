import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';

export const isAuthenticatedGuardGuard: CanActivateFn = (route, state) => {
  const _loggedInUserStoreService = inject(LoggedInUserStoreService);

  if(_loggedInUserStoreService.isLoggedIn()) {
    return true;
  }

  const _router = inject(Router);
  // const urlTree = _router.parseUrl('/auth/login');
  const urlTree = _router.createUrlTree(['/auth/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
  console.log('state.url', state.url);
  
  return new RedirectCommand(urlTree);
};
