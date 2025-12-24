import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleSidenavVisibilityComponent } from './toggle-sidenav-visibility/toggle-sidenav-visibility.component';

@Component({
  selector: 'estudo-header',
  imports: [MatToolbarModule, MatIconModule, ToggleSidenavVisibilityComponent
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
