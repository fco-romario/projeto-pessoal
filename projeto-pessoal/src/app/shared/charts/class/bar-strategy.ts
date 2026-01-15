import { ChartConfiguration } from "chart.js";
import { ChartConfig } from "../interfaces/i-chart-config";
import { ChartStrategy } from "../interfaces/i-chart-strategy";
import { DateUtils } from "../../utils/date/get-months";

export class BarStrategy implements ChartStrategy {
    buildConfiguration(data: ChartConfig): ChartConfiguration {
        return {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: data.dataLabel,
                        data: data.data,
                        backgroundColor: data.backgroundColor,
                        borderColor: data.borderColor,
                        borderWidth: data.borderWidth
                    }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        };
    }
}