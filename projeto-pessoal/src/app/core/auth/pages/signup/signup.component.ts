import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from '../../validators/password-match.validators';
import { AuthFormButtonsComponent } from '../components/auth-form-buttons/auth-form-buttons.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'estudo-signup',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, AuthFormButtonsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
   private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  
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

  redirectLogin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }

}
