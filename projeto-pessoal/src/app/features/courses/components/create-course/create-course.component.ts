import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { SeparatorComponent } from '../../../../shared/separator/separator.component';
import { MatSelectModule } from "@angular/material/select";

enum Category {
  FRONT_END = 'Front-End',
  BACK_END = 'Back-End',
  FULL_STACK = 'Full-Stack',
}

@Component({
  selector: 'estudo-create-course',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, SeparatorComponent, MatSelectModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  readonly categories = Object.entries(Category).map(([key, value]) => value);

  form = computed(() => 
    new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      category: new FormControl('', {validators: [Validators.required]}),
      url: new FormControl('', {validators: [Validators.required, Validators.pattern('https://')]}),
      creaditHoures: new FormControl(''), //TODO ADICIONAR MASK
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  );

}
