import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartComponent } from '../../shared/charts/components/chart.component';
import { PieStrategy } from '../../shared/charts/class/pie-strategy';
import { BarStrategy } from '../../shared/charts/class/bar-strategy';
import { ChartStrategy } from '../../shared/charts/interfaces/i-chart-strategy';
import { LineStrategy } from '../../shared/charts/class/line-strategy';
import { ChartConfig } from '../../shared/charts/interfaces/i-chart-config';
import { DateUtils } from '../../shared/utils/date/get-months';
import { CourseService } from '../../shared/course/services/course.service';
import { Course } from '../../shared/course/interfaces/course';
import { Category } from '../../shared/course/enums/category';

export interface Tile {
  strategy: ChartStrategy;
  cols: number;
  rows: number;
  config: ChartConfig;
}

export interface TileHeader {
  color: string;
  cols: number;
  rows: number;
  text: string;
} 

@Component({
  selector: 'estudo-home',
  imports: [MatGridListModule, ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly _courseService = inject(CourseService);
  private courses = signal<Course[]>([]);

  countCategoryFront = computed(() => {
    return this.courses()
      .filter(course => course.category === Category.FRONT_END).length
  });

  countCategoryBack = computed(() => {
    return this.courses()
      .filter(course => course.category === Category.BACK_END).length
  });

  countCategoryFull= computed(() => {
    return this.courses()
      .filter(course => course.category === Category.FULL_STACK).length
  });

  countCoursesByMonth = computed(() => {
    const currentYear = new Date().getFullYear();
    const monthlyData = new Array(12).fill(0);

  this.courses().forEach(course => {
    const date = new Date(course.createdAt);
    
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth(); 
    }
  });

    return monthlyData;
  });

  lineData = computed<ChartConfig>(() => ({ 
    labels: DateUtils.getMonths(12),
    data: this.countCoursesByMonth(),
    dataLabel: 'Total de Cursos por Mês',
    borderColor: ['rgb(75, 192, 192)'],
    fill: false,
    tension: 0.1
  }) as ChartConfig);

  pieData = computed<ChartConfig>(() => ({
    labels: [Category.FRONT_END, Category.BACK_END, Category.FULL_STACK],
    data: [this.countCategoryFront(), this.countCategoryBack(), this.countCategoryFull()],
    dataLabel: 'Total de Cursos',
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }) as ChartConfig);

  bartData = computed<ChartConfig>(() => ({ 
    labels: DateUtils.getMonths(12),
    data: this.countCoursesByMonth(),
    dataLabel: 'Total de Cursos por Mês',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
      ],
      borderWidth: 1
  }) as ChartConfig);

  tileHeader: TileHeader = {text: 'One', cols: 4, rows: 1, color: 'lightblue'}

  tiles = computed<Tile[]>(() => [
    { strategy: new LineStrategy(), cols: 3, rows: 3, config: this.lineData() },
    { strategy: new PieStrategy(), cols: 1, rows: 4, config: this.pieData() },
    { strategy: new BarStrategy(), cols: 3, rows: 3, config: this.bartData() },
  ]);

  ngOnInit(): void {
    this._courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
      },
      error: (error) => console.log(error)
    });
  }

}
