import { computed, inject, Injectable, signal } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbStore } from '../stores/breadcrumb-store';

@Injectable({
  providedIn: 'root',
})
export class AppTitleStrategyService extends TitleStrategy{

  private readonly title = inject(Title);
  private readonly breadcrumbStore = inject(BreadcrumbStore);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const breadcrumbs: string[] = [];
    const titles: string[] = [];

    let route = routerState.root;

    while (route) {
      if (route.data?.['breadcrumb']) {
        breadcrumbs.push(route.data['breadcrumb']);
      }

      if (route.data['title']) {
        titles.push(route.data['title']);
      }
      route = route.firstChild!;
    }

    this.breadcrumbStore.set(breadcrumbs);

    if (titles.length) {
      this.title.setTitle(titles.join(' | '));
    }
  }
  
}
