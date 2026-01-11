import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { TokenLocalStorageStore } from '../stores/token-local-storage-store.service';

export const setOuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _loggedInUserStoreService = inject(LoggedInUserStoreService);

  if(_loggedInUserStoreService.isLoggedIn()) {
    return next(req);
  }

  const _tokenLocalStorageStore = inject(TokenLocalStorageStore);
  const token = _tokenLocalStorageStore.get();

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return next(newReq);
};
