import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../shared/course/enums/category';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'estudo-card-indicador-count',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: './card-indicador-count.component.html',
  styleUrl: './card-indicador-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardIndicadorCountComponent {
  isLoading = input.required<boolean>();
  indicardorCount = input.required<number>();
  category = input.required<Category>();
  
  categoryColor = computed(() => {
    switch(this.category()) { 
      case Category.FRONT_END: return '#FF4069';
      case Category.BACK_END: return '#FFC234';
      case Category.FULL_STACK: return '#059BFF';
    }
  });
}
