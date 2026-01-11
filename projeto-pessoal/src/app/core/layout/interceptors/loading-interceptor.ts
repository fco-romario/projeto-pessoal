import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { LoadingStore } from '../stores/loading-store';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingState = inject(LoadingStore);

  loadingState.show();

  return next(req).pipe(
    delay(500),
    finalize(() => loadingState.hide())
  )
};
