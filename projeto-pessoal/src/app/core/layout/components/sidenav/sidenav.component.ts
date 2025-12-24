import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavVisibilityStoreService } from '../stores/sidenav-visibility-store.service';

@Component({
  selector: 'estudo-sidenav',
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private readonly _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);

  isSidenavOpened = computed(() => this._sidenavVisibilityStoreService.isVisible());
}
