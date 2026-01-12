import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { SeparatorComponent } from '../../../shared/separator/separator.component';
import { MatSelectModule } from "@angular/material/select";
import { CourseService } from '../../../shared/course/services/course.service';
import { Course, CourseRequest } from '../../../shared/course/interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../shared/feedback/services/feedback.service';

enum Category {
  FRONT_END = 'Front-End',
  BACK_END = 'Back-End',
  FULL_STACK = 'Full-Stack',
}

@Component({
  selector: 'estudo-edit-course',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, SeparatorComponent, MatSelectModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseComponent {
  private readonly _router = inject(Router);  
  private readonly _activatedRoute = inject(ActivatedRoute);  
  private readonly _courseService = inject(CourseService);  
  private readonly _feedbackService = inject(FeedbackService);

  readonly categories = Object.entries(Category).map(([key, value]) => value);

  // course = this._activatedRoute.snapshot.data['course'];

  course = computed(() => this._activatedRoute.snapshot.data['course']);

  form = computed(() => 
    new FormGroup({
      id: new FormControl(this.course()?.id || ''),
      name: new FormControl(this.course()?.name || '', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      url: new FormControl(this.course()?.url || '', {validators: [Validators.required]}),
      category: new FormControl(this.course()?.category || '', {validators: [Validators.required]}),
      status: new FormControl(this.course()?.status || '')
    })
  );

  salvar() {
    const curso = {
      id: this.form().get('id')?.value,
      name: this.form().get('name')?.value,
      url: this.form().get('url')?.value,
      category: this.form().get('category')?.value,
      status: this.form().get('status')?.value
    } as Course;

    this._courseService.updateCourse(curso)
    .subscribe({
      next: () => {
        this._feedbackService.sucecess('Cursos editado com sucesso!');
        this._router.navigate(['courses']);
      },
      error: (error) => this._feedbackService.error('Erro ao editar cursos. Tente novamente mais tarde.')
    });
  }
}
