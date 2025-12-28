import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'estudo-sidenav-items',
  imports: [RouterLink, MatListModule, RouterLinkActive, MatIconModule],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemsComponent {
  links = signal([
    {
      label: 'Dashboard',
      url: '/',
      icon: 'home'
    },
    {
      label: 'outro',
      url: '/outra'
    },
  ]);

  closeSidenav() {
    throw new Error('Method not implemented.');
  }

}
