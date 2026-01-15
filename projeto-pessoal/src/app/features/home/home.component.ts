import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartComponent } from '../../shared/charts/components/chart.component';
import { PieStrategy } from '../../shared/charts/class/pie-strategy';
import { BarStrategy } from '../../shared/charts/class/bar-strategy';
import { ChartStrategy } from '../../shared/charts/interfaces/i-chart-strategy';
import { LineStrategy } from '../../shared/charts/class/line-strategy';
import { ChartConfig } from '../../shared/charts/interfaces/i-chart-config';
import { DateUtils } from '../../shared/utils/date/get-months';

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
export class HomeComponent {

  lineData = { 
    labels: DateUtils.getMonths(12),
    data: [65, 59, 80, 81, 56, 55, 40],
    dataLabel: 'My First Dataset',
    borderColor: ['rgb(75, 192, 192)'],
    fill: false,
    tension: 0.1
  };

  pieData = {
    labels: ['Ganhos', 'Gastos', 'Outros'],
    data: [1000, 250, 50],
    dataLabel: 'My First Dataset',
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  };

  bartData = { 
    labels: DateUtils.getMonths(12),
    data: [65, 59, 80, 81, 56, 55, 40],
    dataLabel: 'My First Dataset',
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
  };

  tileHeader: TileHeader = {text: 'One', cols: 4, rows: 1, color: 'lightblue'}

  tiles: Tile[] = [
    {strategy: new LineStrategy(), cols: 3, rows: 3, config: this.lineData},
    {strategy: new PieStrategy(), cols: 1, rows: 4, config: this.pieData},
    {strategy: new BarStrategy(), cols: 3, rows: 3, config: this.bartData},
  ];
  
}
