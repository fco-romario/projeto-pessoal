import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from '../../validators/password-match.validators';
import { AuthFormButtonsComponent } from '../components/auth-form-buttons/auth-form-buttons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/user/services/user.service';
import { User } from '../../../../shared/user/interfaces/user';
import { switchMap } from 'rxjs';
import { PersonService } from '../../../../shared/person/services/person.service';
import { PersonCreate } from '../../../../shared/person/interfaces/person';

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
  private readonly _userService = inject(UserService);
  private readonly _personService = inject(PersonService);
  
  hide = signal(true);

  form = new FormGroup({
    name: new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]}),
    usuario: new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
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
    const person: PersonCreate = {
      name: this.form.value.name as string,
      email: this.form.value.email as string,
    };

    this._personService.createPerson(person).pipe(
      switchMap((createPerson) => {
        const user: User = {
          username: this.form.value.usuario as string,
          password: this.form.value.password as string,
          personId: createPerson.id
        };

        return this._userService.createUser(user);
      })
    )
    .subscribe({
      next: (user) => {
        console.log('Craido: ', user);
        alert('submited');
      }, error: (error) => {
        console.error('Error: ', error);
        alert('Erro ao criar conta');
      }
    })
  }

  redirectLogin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }

}
