import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'estudo-user',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  readonly form = new FormGroup({
    name: new FormControl('', {validators:
      [ 
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]}),
    mathersName : new FormControl('', {validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150),
     ]}),
    gener: new FormControl('', {validators: [ Validators.required ]}),
    phoneNumber: new FormControl('', {validators: [ Validators.required ]}),// adicionar validação de telefone
    cpf: new FormControl('', {validators: [ Validators.required ]}), // adicionar validação de cpf
    rg: new FormControl('', {validators: [ Validators.required ]}), // adicionar validação de rg
  });

}

