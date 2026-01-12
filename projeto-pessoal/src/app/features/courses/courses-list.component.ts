import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course/interfaces/course';
import { CourseService } from '../../shared/course/services/course.service';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';

@Component({
  selector: 'estudo-courses',
  imports: [MatTableModule, MatButtonModule, MatIconModule, DatePipe],
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

  constructor() {
    //todo refatorar para uso de HttpResource 
    this.getAllCourses();
  }

  onCreate() {
    this._router.navigate(['create-course'], { relativeTo: this._activatedRoute });
  }
  
  onDelete(course: Course) {
    this.dataSource.data
    this._courseService.deleteCourse(course.id).subscribe({
      next: () => {
        this._feedbackService.sucecess('Curso deletado com sucesso!');
        this.getAllCourses();
      },
      error: (error) => {
        console.log(error);
        this._feedbackService.error('Erro ao deletar curso. Tente novamente mais tarde.');
      }
    })
  }
  onEdit(_t65: any) {
    throw new Error('Method not implemented.');
  }

  getAllCourses() {
    this._courseService.getAllCourses().subscribe((courses) =>{
      this.dataSource.data = courses
    });
  }
}
