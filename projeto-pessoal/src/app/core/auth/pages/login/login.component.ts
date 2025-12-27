import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthFormButtonsComponent } from "../components/auth-form-buttons/auth-form-buttons.component";
import { AuthService } from '../../services/auth.service';
import { AuthTokenResponse } from '../../interfaces/auth-token-response';
import { UserCredentials } from '../../interfaces/user-credentials';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'estudo-login',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, AuthFormButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  hide = signal(true);

  form = new FormGroup({
    user: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]}),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    this._authService.login({...this.form.value} as UserCredentials)
    .subscribe({
      next: (token: AuthTokenResponse) => {
        this._router.navigate(['../home'], { relativeTo: this._activatedRoute });
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.form.setErrors({invalidCredentials: true});
        }
      }
    });
  }
 
  criarConta() {
    this._router.navigate(['../signup'], { relativeTo: this._activatedRoute });
  }
}
