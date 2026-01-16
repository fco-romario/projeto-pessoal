import { ChartConfiguration } from "chart.js";
import { ChartConfig } from "../interfaces/i-chart-config";
import { ChartStrategy } from "../interfaces/i-chart-strategy";
import { DateUtils } from "../../utils/date/get-months";

export class LineStrategy implements ChartStrategy {
    
    buildConfiguration(data: ChartConfig): ChartConfiguration {
        return {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    { 
                        label: data.dataLabel,
                        data: data.data,
                        borderColor: data.borderColor,
                        fill: data.fill,
                        tension: data.tension 
                    }
                ],
            },
            options: { responsive: true, maintainAspectRatio: false }
        };
    }
}