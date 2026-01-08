import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Course } from '../../shared/course/interfaces/course';
import { CourseService } from '../../shared/course/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'estudo-courses',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  private readonly _courseService = inject(CourseService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['id', 'name', 'url', 'date', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  constructor() {
    //todo refatorar para uso de HttpResource 
    this.getAllCourses();
  }

  add() {
    this._router.navigate(['create-course'], { relativeTo: this._activatedRoute });
    // this._courseService.savaCourse({name: 'Spring', url: 'www.angular.com', date: new Date()}).subscribe({
    //   next: () => {
    //     this.getAllCourses();
    //   }
    // })
  }
  onDelete(_t65: any) {
    throw new Error('Method not implemented.');
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
