import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'estudo-create-course-list',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './create-course-list.component.html',
  styleUrl: './create-course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseListComponent {
  displayedColumns: string[] = ['name', 'category', 'url', 'createdAt', 'status'];
  data: any[] = [
    {
      name: 'Angular 14',
      category: 'Front-end',
      url: 'https://angular.io/',
      status: true,
      createdAt: new Date(),
    }
  ];
}
