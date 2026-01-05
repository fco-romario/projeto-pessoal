import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EnderecoExpansionPanelComponent } from "./components/endereco-expansion-panel/endereco-expansion-panel.component";
import { MatDividerModule } from '@angular/material/divider';
import { SeparatorComponent } from "../../shared/separator/separator.component";
import { MatSelectModule } from '@angular/material/select';
import { Person } from '../../shared/person/interfaces/person';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PersonService } from '../../shared/person/services/person.service';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';
import { Address } from '../../shared/person/interfaces/address';

@Component({
  selector: 'estudo-user',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, EnderecoExpansionPanelComponent, MatDividerModule, SeparatorComponent,MatSelectModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {

  private fb = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _personService = inject(PersonService);
  private _feedbackService = inject(FeedbackService);

  enderecosGet= computed(() => {
    return this.form.get('enderecos') as FormArray;
  })

  readonly genderList: string[] = ['Masculino', 'Feminino', 'Outro'];

  person = toSignal(
    this._activatedRoute.data.pipe(map(p => p['person'] as Person))
  );

  edit = signal(false);

  editToggle = computed(() => {this.edit()});
  
  form = new FormGroup({
    id: new FormControl(this.person()?.id || ''),
    name: new FormControl(this.person()?.name || '', {validators:
      [ 
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]}),
    mathersName : new FormControl(this.person()?.mathersName || '', {validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150),
     ]}),
    gender: new FormControl(this.person()?.gender || '', {validators: [ Validators.required ]}),
    phoneNumber: new FormControl(this.person()?.phoneNumber || '', {validators: [ Validators.required ]}),// adicionar validação de telefone
    cpf: new FormControl(this.person()?.cpf || '', {validators: [ Validators.required ]}), // adicionar validação de cpf
    rg: new FormControl(this.person()?.rg || '', {validators: [ Validators.required ]}), // adicionar validação de rg
    enderecos: this.fb.array(this.returnAddresses(this.person()!), Validators.maxLength(2)),
  });

  addAddress(addresses?: Address) {
    return this.fb.group({
      id: new FormControl(addresses?.id || ''),
      cep: new FormControl(addresses?.cep || '', {validators: [ Validators.required ]}), // adicionar validação de cep
      logradouro: new FormControl(addresses?.logradouro || '', {validators: [ Validators.required ]}),
      bairro: new FormControl(addresses?.bairro || '', {validators: [ Validators.required ]}),
      // cidade: new FormControl('', {validators: [ Validators.required ]}),
      // estado: new FormControl('', {validators: [ Validators.required ]}),
      numero: new FormControl(addresses?.numero || '', {validators: [ Validators.required ]}),
      complemento: new FormControl(addresses?.complemento || ''),
    })
  }

  private returnAddresses(person: Person) {
    if(!person!.addresses?.length) return [this.addAddress(), this.addAddress()]; 

    const formAddresses = person.addresses!.map(address => this.addAddress(address));
    formAddresses.length === 1 ? formAddresses.push(this.addAddress()) : formAddresses;
    return formAddresses;
  }

  ngOnInit(): void {
    this.form.disable();
  }

  update(): void {
    if(!this.edit()) {
      this.edit.set(true);
      this.form.enable();
      return;
    }

    const person = {
      id: this.form.controls['id'].value,
      name: this.form.controls['name'].value,
      mathersName: this.form.controls['mathersName'].value,
      gender: this.form.controls['gender'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      cpf: this.form.controls['cpf'].value,
      rg: this.form.controls['rg'].value,
      addresses: this.form.controls['enderecos'].value as Address[],
    } as Person;

   
    this._personService.savePerson(person).subscribe({
      next: (p) => {
        this._feedbackService.sucecess('Pessoa atualizada com sucesso.');
        this.form.patchValue({...p});
        this.edit.set(false);
        this.form.disable();
      },
      error: (error) => {this._feedbackService.error('Erro ao atualizar pessoa. Tente novamente mais tarde.'), console.error(error)},
    });
  }
}

