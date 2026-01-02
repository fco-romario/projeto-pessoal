import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EnderecoExpansionPanelComponent } from "./components/endereco-expansion-panel/endereco-expansion-panel.component";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from '@angular/material/divider';
import { SeparatorComponent } from "../../shared/separator/separator.component";

@Component({
  selector: 'estudo-user',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, EnderecoExpansionPanelComponent, MatDividerModule, SeparatorComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  private fb = inject(FormBuilder);

  enderecosGet= computed(() => {
    return this.form.get('enderecos') as FormArray;
  })

  enderecos = new FormGroup({
    cep: new FormControl('', {validators: [ Validators.required ]}), // adicionar validação de cep
    logradouro: new FormControl('', {validators: [ Validators.required ]}),
    bairro: new FormControl('', {validators: [ Validators.required ]}),
    // cidade: new FormControl('', {validators: [ Validators.required ]}),
    // estado: new FormControl('', {validators: [ Validators.required ]}),
    numero: new FormControl('', {validators: [ Validators.required ]}),
    complemento: new FormControl(''),
  })

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
    enderecos: this.fb.array([this.enderecos, this.enderecos], Validators.required),
  });

}

