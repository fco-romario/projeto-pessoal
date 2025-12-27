import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from '../../validators/password-match.validators';

@Component({
  selector: 'estudo-signup',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {

  hide = signal(true);

  form = new FormGroup({
    name: new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]}),
    email: new FormControl('', {validators: [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)]}),
    password: new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
    ]}),
    confirmPassword: new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
    ]}),
  }, {validators: passwordMatchValidator}
);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    throw new Error('Method not implemented.');
  }

}
