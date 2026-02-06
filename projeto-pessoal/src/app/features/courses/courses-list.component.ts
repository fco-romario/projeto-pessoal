import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Course, CourseFilter } from '../../shared/course/interfaces/course';
import { CourseService } from '../../shared/course/services/course.service';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';
import { PaginatorComponent } from '../../shared/commons/paginator/paginator.component';
import { Page } from '../../shared/commons/paginator/interfaces/i-page-json-server';
import { map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CoursesFilterComponent } from "./components/courses-filter/courses-filter.component";

@Component({
  selector: 'estudo-courses',
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe, PaginatorComponent, CoursesFilterComponent],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  private readonly _courseService = inject(CourseService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _feedbackService = inject(FeedbackService);
  
  displayedColumns: string[] = ['id', 'name', 'url', 'category', 'createdAt', 'status','actions'];
  dataSource = new MatTableDataSource<Course>([]);

  paginated = signal<Page<Course>>({
    content: [],
    totalElements: 0,
    number: 0,
    size: 5,
    pageSizeOptions: [5, 10, 25, 100]
  })

  constructor() {
    //todo refatorar para uso de HttpResource 
    this.getAllCoursesPaginated();
  }

  onCreate() {
    this._router.navigate(['create-course'], { relativeTo: this._activatedRoute });
  }
  
  onDelete(course: Course) {
    this.dataSource.data
    this._courseService.deleteCourse(course.id).subscribe({
      next: () => {
        this._feedbackService.sucecess('Curso deletado com sucesso!');
        // this.getAllCourses();
        this.getAllCoursesPaginated();
      },
      error: (error) => {
        console.log(error);
        this._feedbackService.error('Erro ao deletar curso. Tente novamente mais tarde.');
      }
    })
  }
  onEdit(course: Course) {
    this._router.navigate(['edit-course', course.id], { relativeTo: this._activatedRoute });
  }

  getAllCoursesPaginated(filter?: CourseFilter) {
    this._courseService.getAllCoursesPaginated(this.paginated().number + 1, this.paginated().size, filter)
      .pipe(
        map(response => {
            this.paginated.update(p => ({
              ...p,
              content: response.data,
              totalElements: response.items
            }))
        }),
      ).subscribe((courses) => {
        this.dataSource.data = this.paginated().content;
    });
  }

  onPageChange(event: PageEvent) {
    this.paginated().number = event.pageIndex;
    this.paginated().size = event.pageSize;
    this.getAllCoursesPaginated();    
  }

  search(filter: CourseFilter) {
    this.getAllCoursesPaginated(filter);
  }
}
