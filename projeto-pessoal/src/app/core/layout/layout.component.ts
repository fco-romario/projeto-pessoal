import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbStore } from './stores/breadcrumb-store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingStore } from './stores/loading-store';

@Component({
  selector: 'estudo-layout',
  imports: [HeaderComponent, SidenavComponent, RouterOutlet, FooterComponent, MatToolbarModule, MatProgressBarModule, RouterLinkWithHref],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly _breadcrumbStore = inject(BreadcrumbStore);
  private readonly _loadingStore = inject(LoadingStore);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public tree = computed(() => {
    return this._breadcrumbStore.breadcrumbs();
    // return this._breadcrumbStore.breadcrumbs().join(' • ');
  });

  public isLoading = computed(() => this._loadingStore.isLoading());

  public lastOnetree = computed(() => {
    return this._breadcrumbStore.breadcrumbs()[this._breadcrumbStore.breadcrumbs().length - 1];
  });

  redirect(tree: string) {
    switch(tree) {
      case 'Cursos' : return 'courses';
      default: return '';
    }
  }
}
