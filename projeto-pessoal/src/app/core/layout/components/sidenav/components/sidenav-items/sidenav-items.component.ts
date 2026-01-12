import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoggedInUserStoreService } from '../../../../../auth/stores/logged-in-user-store.service';
import { LogoutFacadeService } from '../../../../../auth/facades/logout-facade.service';
import { SidenavVisibilityStoreService } from '../../../stores/sidenav-visibility-store.service';

@Component({
  selector: 'estudo-sidenav-items',
  imports: [RouterLink, MatListModule, RouterLinkActive, MatIconModule],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemsComponent {
  private _sidenavVisibilityStore = inject(SidenavVisibilityStoreService);
  private _logoutFacadeService = inject(LogoutFacadeService);
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
    {
      label: 'Cursos',
      url: '/courses',
      icon: 'history_edu_24'
    },
  ]);

  closeSidenav() {
    this._sidenavVisibilityStore.close();
  }

  logout() {
    this._logoutFacadeService.logout()
      .subscribe({
        next: () => this._router.navigate(['/auth/login']),
    });     
  }
}
