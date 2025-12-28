import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoggedInUserStoreService } from '../../../../../auth/stores/logged-in-user-store.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { tap } from 'rxjs';
import { TokenLocalStorageStore } from '../../../../../auth/stores/token-local-storage-store.service';

@Component({
  selector: 'estudo-sidenav-items',
  imports: [RouterLink, MatListModule, RouterLinkActive, MatIconModule],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemsComponent {
  private _authService = inject(AuthService);
  private _tokenLocalStorageStore = inject(TokenLocalStorageStore);
  private _loggedInUserStoreService = inject(LoggedInUserStoreService);
  private _router = inject(Router);

  isLoggedIn = computed(() => this._loggedInUserStoreService.isLoggedIn());

  links = signal([
    {
      label: 'Dashboard',
      url: '/',
      icon: 'home'
    },
    {
      label: 'Usuário',
      url: '/user',
      icon: 'person'
    },
  ]);

  closeSidenav() {
    throw new Error('Method not implemented.');
  }

  logout() {
    this._authService.logout()
      .pipe(
        tap(() => this._tokenLocalStorageStore.remove()),
        tap(() => this._loggedInUserStoreService.logout()),
      )
      .subscribe({
        next: () => this._router.navigate(['/auth/login']),
      });     
  }
}
