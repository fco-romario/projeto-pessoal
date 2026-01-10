import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CourseRequest } from '../../../../../shared/course/interfaces/course';

@Component({
  selector: 'estudo-create-course-list',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './create-course-list.component.html',
  styleUrl: './create-course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseListComponent {
  displayedColumns: string[] = ['name', 'category', 'url', 'status'];
  
  course = input.required<CourseRequest | null>();

  private data = signal<CourseRequest[]>([]);
  courses = this.data.asReadonly();

  constructor() {
    effect(() => {
      if(!this.course()) return;

      const currentCourse = this.course();
      
      this.data.update(list => [...list, currentCourse!]);
    });
  }
}
