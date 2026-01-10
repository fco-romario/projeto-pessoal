import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { SeparatorComponent } from '../../../../shared/separator/separator.component';
import { MatSelectModule } from "@angular/material/select";
import { CreateCourseListComponent } from './create-course-list/create-course-list.component';
import { CourseService } from '../../../../shared/course/services/course.service';
import { CourseRequest } from '../../../../shared/course/interfaces/course';

enum Category {
  FRONT_END = 'Front-End',
  BACK_END = 'Back-End',
  FULL_STACK = 'Full-Stack',
}

@Component({
  selector: 'estudo-create-course',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, SeparatorComponent, MatSelectModule, CreateCourseListComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  course = signal<CourseRequest | null>(null);

  courseToAdd = computed(() => this.course());

  readonly categories = Object.entries(Category).map(([key, value]) => value);

  form = computed(() => 
    new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      url: new FormControl('', {validators: [Validators.required]}),
      category: new FormControl(''),
      status: new FormControl('')
    })
  );

  add() {
    this.course.set(null);

    const curso = {
      name: this.form().get('name')?.value,
      url: this.form().get('url')?.value,
      category: this.form().get('category')?.value,
      status: this.form().get('status')?.value
    } as CourseRequest;

    this.course.set(curso);
    this.form().reset();
  }

}
