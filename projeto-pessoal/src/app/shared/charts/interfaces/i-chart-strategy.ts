import { ChartConfiguration } from 'chart.js';
import { ChartConfig } from './i-chart-config';

export interface ChartStrategy {
  buildConfiguration(data: ChartConfig): ChartConfiguration;
}