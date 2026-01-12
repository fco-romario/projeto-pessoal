import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { SeparatorComponent } from '../../../shared/separator/separator.component';
import { MatSelectModule } from "@angular/material/select";
import { CreateCourseListComponent } from '../components/create-course-list/create-course-list.component';
import { CourseService } from '../../../shared/course/services/course.service';
import { CourseRequest } from '../../../shared/course/interfaces/course';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../shared/feedback/services/feedback.service';
import { Category } from '../../../shared/course/interfaces/category';
import { Status } from '../../../shared/course/interfaces/status';

@Component({
  selector: 'estudo-create-course',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, SeparatorComponent, MatSelectModule, CreateCourseListComponent],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  private readonly _router = inject(Router);  
  private readonly _courseService = inject(CourseService);  
  private readonly _feedbackService = inject(FeedbackService);

  courses = signal<CourseRequest[]>([]);
  
  readonly categories = Object.entries(Category).map(([key, value]) => value);
  readonly statusList = Object.entries(Status).map(([key, value]) => value);

  form = computed(() => 
    new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      url: new FormControl('', {validators: [Validators.required]}),
      category: new FormControl('', {validators: [Validators.required]}),
      status: new FormControl('')
    })
  );

  add() {
    const curso = {
      name: this.form().get('name')?.value,
      url: this.form().get('url')?.value,
      category: this.form().get('category')?.value,
      status: this.form().get('status')?.value
    } as CourseRequest;

    this.courses.update((courses) => [...courses, curso]);
    this.form().reset();
  }

  save(courses: CourseRequest[]) {
    this._courseService.savaCourses(courses)
    .subscribe({
      next: () => {
        this._feedbackService.sucecess('Cursos salvos com sucesso!');
        this._router.navigate(['courses']);
      },
      error: (error) => this._feedbackService.error('Erro ao salvar cursos. Tente novamente mais tarde.')
    });
  }

  edit(curso: CourseRequest) {

    this.form().patchValue({...curso});
    this.form().markAsDirty();
    this.remove(curso);
  }

  remove(curso: CourseRequest) {
    this.courses.update(courses => courses.filter(c => {
      return c.name !== curso.name ||
      c.url !== curso.url ||
      c.category !== curso.category ||
      c.status !== curso.status
    }));
  }
}
