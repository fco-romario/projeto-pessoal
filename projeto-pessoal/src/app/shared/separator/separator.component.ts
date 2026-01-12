import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'estudo-separator',
  imports: [],
  template: `
    <div class="separator">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .separator {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 12px 0;
    
      &::before,
      &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }

      &::before { margin-right: 36px; margin-left: 18px; }
      &::after { margin-right: 18px; margin-left: 36px; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent {

}
