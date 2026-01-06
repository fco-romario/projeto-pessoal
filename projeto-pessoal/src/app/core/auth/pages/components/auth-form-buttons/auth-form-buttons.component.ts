import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SeparatorComponent } from "../../../../../shared/separator/separator.component";

@Component({
  selector: 'estudo-auth-form-buttons',
  imports: [MatButtonModule, SeparatorComponent],
  templateUrl: './auth-form-buttons.component.html',
  styleUrl: './auth-form-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormButtonsComponent {
  form = input.required<boolean>();
  submitLabel = input.required<string>();
  redirectLabel = input.required<string>();
  
  formInvalid = computed(() => this.form());
  
  submitBtn = output();
  redirectBtn = output();

  submit() {
    this.submitBtn.emit();
  }

  redirect() {
    this.redirectBtn.emit();
  }

}
