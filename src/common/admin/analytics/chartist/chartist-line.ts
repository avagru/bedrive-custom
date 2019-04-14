import * as Chartist from 'chartist';
import { BaseChart } from '../base-chart';
import { IChartistLineChart } from 'chartist';
import { ILineChartOptions } from 'chartist';

export class ChartistLine extends BaseChart {
    protected lineConfig: ILineChartOptions = {
        showArea: true,
        lineSmooth: true,
        low: 0,
        fullWidth: true,
        chartPadding: {
            top: 0,
            left: 15,
            right: 30,
            bottom: 0,
        }
    };

    protected chart: IChartistLineChart;

    protected generate() {
        this.chart = new Chartist.Line(
            this.config.selector,
            this.transformChartData(),
            this.lineConfig
        );
    }

    protected transformChartData() {
        return  {
            labels: this.config.labels,
            series: this.config.data,
        };
    }

    public destroy() {
        if (this.chart) {
            this.chart.detach();
        }
    }
}
