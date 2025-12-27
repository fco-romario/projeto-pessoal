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
import { TokenLocalStorageStore } from '../../stores/token-local-storage-store.service';
import { filter, switchMap, tap } from 'rxjs';
import { User } from '../../interfaces/user';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store.service';

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
  private readonly _tokenLocalStorageStore = inject(TokenLocalStorageStore);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

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
    .pipe(
      tap((response: AuthTokenResponse) => this._tokenLocalStorageStore.set(response.token)),
      switchMap((response: AuthTokenResponse) => this._authService.getCurrentUser(response.token)),
      tap((user: User) => this._loggedInUserStoreService.setUser(user)),
    )
    .subscribe({
      next: () => this._router.navigate(['/']),
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
