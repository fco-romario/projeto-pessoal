import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'estudo-toggle-sidenav-visibility',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-sidenav-visibility.component.html',
  styleUrl: './toggle-sidenav-visibility.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSidenavVisibilityComponent {

}
