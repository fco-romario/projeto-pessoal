import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Course } from '../../shared/course/interfaces/course';
import { CourseService } from '../../shared/course/services/course.service';

@Component({
  selector: 'estudo-courses',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  private readonly _courseService = inject(CourseService);
  displayedColumns: string[] = ['id', 'name', 'url', 'date', 'actions'];
  dataSource = new MatTableDataSource<Course>([]);

  constructor() {
    //todo refatorar para uso de HttpResource 
    this.getAllCourses();
  }

  add() {
    this._courseService.savaCourse({name: 'Spring', url: 'www.angular.com', date: new Date()}).subscribe({
      next: () => {
        this.getAllCourses();
      }
    })
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
