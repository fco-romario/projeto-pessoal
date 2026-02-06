import { ChangeDetectionStrategy, Component, computed, output } from '@angular/core';
import { SeparatorComponent } from "../../../../shared/separator/separator.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../../shared/course/enums/category';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CourseFilter } from '../../../../shared/course/interfaces/course copy';
import { MatButtonModule } from '@angular/material/button';
import { Status } from '../../../../shared/course/enums/status';

@Component({
  selector: 'estudo-courses-filter',
  imports: [ReactiveFormsModule, MatInputModule,  MatFormFieldModule, MatSelectModule, SeparatorComponent, MatIconModule, MatButtonModule],
  templateUrl: './courses-filter.component.html',
  styleUrl: './courses-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesFilterComponent {
  onSearch = output<CourseFilter>();

  public readonly categories = Object.entries(Category).map(([key, value]) => value);
  public readonly statusList = Object.entries(Status).map(([key, value]) => value);

  form = computed(() =>
      new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
      category: new FormControl(''),
      status: new FormControl('')
    })
  );


 search() {
  this.onSearch.emit(this.form().value as CourseFilter);
 }
}
