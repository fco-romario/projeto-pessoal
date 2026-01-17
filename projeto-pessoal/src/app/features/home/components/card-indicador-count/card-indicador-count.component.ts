import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../shared/course/enums/category';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'estudo-card-indicador-count',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './card-indicador-count.component.html',
  styleUrl: './card-indicador-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardIndicadorCountComponent {
  indicardorCount = input.required<number>();
  category = input.required<Category>();

}
