import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbStore } from './stores/breadcrumb-store';

@Component({
  selector: 'estudo-layout',
  imports: [HeaderComponent, SidenavComponent, RouterOutlet, FooterComponent, MatToolbarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly _breadcrumbStore = inject(BreadcrumbStore);

  public tree = computed(() => {
    return this._breadcrumbStore.breadcrumbs().join(' • ');
  });

  public lastOnetree = computed(() => {
    return this._breadcrumbStore.breadcrumbs()[this._breadcrumbStore.breadcrumbs().length - 1];
  });
}
