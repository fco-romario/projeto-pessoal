import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SidenavVisibilityStoreService } from '../../stores/sidenav-visibility-store.service';

@Component({
  selector: 'estudo-toggle-sidenav-visibility',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSidenavVisibilityComponent {
  private readonly _sidenavVisibilityStore = inject(SidenavVisibilityStoreService);
  
  isIconOpened = computed(() => this._sidenavVisibilityStore.isVisible() ? 'menu_open' : 'menu');

  toggleSidenavVisibility() {
    this._sidenavVisibilityStore.toggle();
  }
}
