import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'estudo-create-course-list',
  imports: [MatTableModule, MatSortModule, DatePipe],
  templateUrl: './create-course-list.component.html',
  styleUrl: './create-course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseListComponent {
  displayedColumns: string[] = ['name', 'category', 'url', 'creaditHoures', 'startDate', 'endDate'];
  data: any[] = [
    {
    number: 1,
    title: 'Angular',
    category: 'Back-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Front-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Front-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Back-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Front-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Back-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Back-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
    {
    number: 1,
    title: 'Angular',
    category: 'Front-End',
    url: 'https://angular.io/',
    creaditHoures: 100,
    startDate: new Date(),
    endDate: new Date()
  },
];
}
