import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnDestroy, ViewChild, ElementRef, OnChanges, HostBinding
} from '@angular/core';
import { BaseChart, ChartConfig, ChartType } from '../../base-chart';
import { ChartistLine } from '../../chartist/chartist-line';
import { ChartistPie } from '../../chartist/chartist-pie';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges, OnDestroy {
    @Input() chartConfig: ChartConfig;
    @ViewChild('chartPlaceholder') chartPlaceholder: ElementRef;

    @HostBinding('class') get hostClass() {
        return (this.chartConfig ? this.chartConfig.type : '') + '-chart-container';
    }

    private chart: BaseChart;


    ngOnChanges() {
        if ( ! this.chartConfig) return;

        if (this.chartConfig.type === ChartType.LINE) {
            this.chart = new ChartistLine(this.transformConfig());
        } else {
            this.chart = new ChartistPie(this.transformConfig());
        }
    }

    ngOnDestroy() {
        if ( ! this.chart) return;
        this.chart.destroy();
    }

    private transformConfig() {
        return {
            ...this.chartConfig,
            selector: this.chartPlaceholder.nativeElement
        };
    }
}
