import { afterNextRender, ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartStrategy } from '../interfaces/i-chart-strategy';
import { ChartConfig } from '../interfaces/i-chart-config';

@Component({
  selector: 'estudo-chart',
  template: `<canvas #canvas></canvas>`,
  styles: [`:host { display: block; height: 100%; width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  
  strategy = input.required<ChartStrategy>();
  data = input.required<ChartConfig>();

  private chart?: Chart;
  
  constructor() {
    afterNextRender(() => this.render());

    effect(() => {
      this.strategy();
      this.data();
      this.render();
    });
  }

  private render() {
    if (this.chart) this.chart.destroy();

    const config = this.strategy().buildConfiguration(this.data());
    this.chart = new Chart(this.canvasEl().nativeElement, config);
  }
}