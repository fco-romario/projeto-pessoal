import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'estudo-endereco-expansion-panel',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './endereco-expansion-panel.component.html',
  styleUrl: './endereco-expansion-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnderecoExpansionPanelComponent {
  readonly panelOpenState = signal(false);
  readonly index = input.required<number>();
  
  formIndex = computed(() => this.index() + 1);

}
