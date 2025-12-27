import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'estudo-auth-form-buttons',
  imports: [MatButtonModule],
  templateUrl: './auth-form-buttons.component.html',
  styleUrl: './auth-form-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormButtonsComponent {
  submitLabel = input.required<string>();
  redirectLabel = input.required<string>();
  
  submitBtn = output();
  redirectBtn = output();

  submit() {
    this.submitBtn.emit();
  }

  redirect() {
    this.redirectBtn.emit();
  }

}
