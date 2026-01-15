export interface ChartConfig {
  labels: string[],
  dataLabel: string;
  data: number[],
  backgroundColor?: string[],
  borderColor?: string[],
  fill?: boolean,
  tension?: number,
  borderWidth?: number,
  hoverOffset?: number
}