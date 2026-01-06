import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  url: string;
  date: Date;
}

@Component({
  selector: 'estudo-courses',
  imports: [MatTableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  displayedColumns: string[] = ['id', 'name', 'url', 'date'];
  dataSource: MatTableDataSource<UserData>;

  constructor() {
    this.dataSource = new MatTableDataSource(
      [
        { 
          id: '1', name: 'Angular + Spring', url: 'https://www.youtube.com/watch?v=tPOMG0D57S0&list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G', date: new Date() 
        },
        { 
          id: '2', name: 'Angular + Spring', url: 'https://www.youtube.com/watch?v=tPOMG0D57S0&list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G', date: new Date() 
        },
        { 
          id: '3', name: 'Angular + Spring', url: 'https://www.youtube.com/watch?v=tPOMG0D57S0&list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G', date: new Date() 
        },
      ]);
   }
}
