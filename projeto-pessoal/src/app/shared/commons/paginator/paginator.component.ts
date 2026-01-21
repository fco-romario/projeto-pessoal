import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Course } from '../../course/interfaces/course';
import { Page } from './interfaces/i-page-json-server';

@Component({
  selector: 'estudo-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  paginated = input.required<Page<Course>>();

  pageEvent = output<PageEvent>();

  totalElements = computed(() => this.paginated().totalElements)
  pageSize = computed(() => this.paginated().size)
  pageIndex = computed(() => this.paginated().number)
  pageSizeOptions = computed(() => this.paginated().pageSizeOptions)

  onPageChange(event: PageEvent) {
    this.pageEvent.emit(event);
  }

}
