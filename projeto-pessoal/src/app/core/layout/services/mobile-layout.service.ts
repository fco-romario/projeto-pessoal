import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileLayoutService {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  public readonly isMobile = toSignal(
    this._breakpointObserver
      .observe('(max-width: 1280px)')
      .pipe(map(state => state.matches)),
    { initialValue: false }
  );

  // isMobile() {
  //   const matches = this._breakpointObserver
  //     .observe('(max-width: 1280px)')
  //     .pipe(map((state) => state.matches));

  //     console.log('matches', matches);

  //     return toSignal(matches, { requireSync: true });
  // }
}
