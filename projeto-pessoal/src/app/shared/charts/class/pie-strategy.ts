import { ChartConfiguration } from "chart.js";
import { ChartConfig } from "../interfaces/i-chart-config";
import { ChartStrategy } from "../interfaces/i-chart-strategy";

export class PieStrategy implements ChartStrategy {
    buildConfiguration(data: ChartConfig): ChartConfiguration {
        return {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [
                    { 
                        label: data.dataLabel,
                        data: data.data,
                        backgroundColor: data.backgroundColor,
                        hoverOffset: data.hoverOffset
                    }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        };
    }
}