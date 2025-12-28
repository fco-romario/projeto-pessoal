import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavVisibilityStoreService } from '../stores/sidenav-visibility-store.service';
import { MobileLayoutService } from '../../services/mobile-layout.service';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';

@Component({
  selector: 'estudo-sidenav',
  imports: [MatSidenavModule, SidenavItemsComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private readonly _sidenavVisibilityStoreService = inject(SidenavVisibilityStoreService);
  private readonly _mobileLayoutService = inject(MobileLayoutService);

  private readonly isMobile = computed(() => this._mobileLayoutService.isMobile());

  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');
  
  isSidenavOpened = computed(() => {
    if(!this.isMobile()) return true;
    
    return this._sidenavVisibilityStoreService.isVisible();
  });

  onSidenavClosed() {
    this._sidenavVisibilityStoreService.close();
  }
}
