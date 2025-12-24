import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-pessoal');
}
