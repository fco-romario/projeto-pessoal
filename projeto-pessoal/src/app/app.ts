import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SidenavComponent } from "./core/layout/components/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatToolbarModule, SidenavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-pessoal');
}
