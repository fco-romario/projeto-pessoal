import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CourseRequest } from '../../../../../shared/course/interfaces/course';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'estudo-create-course-list',
  imports: [MatTableModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './create-course-list.component.html',
  styleUrl: './create-course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseListComponent {
  displayedColumns: string[] = ['name', 'category', 'url', 'status', 'actions'];
  
  salvar = output<CourseRequest[]>();

  courses = input.required<CourseRequest[]>();
  edit = output<CourseRequest>();
  delete = output<CourseRequest>();
  
}
