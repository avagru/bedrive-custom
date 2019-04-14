export enum ChartType {
    LINE = 'line',
    PIE = 'pie'
}

export interface ChartConfig {
    selector: string;
    type: ChartType;
    labels: string[];
    data: number[]|number[][];
    legend?: boolean;
}

export abstract class BaseChart {
    constructor(protected config: ChartConfig) {
        setTimeout(() => this.generate());
    }

    protected abstract generate();

    protected abstract transformChartData();

    public abstract destroy();
}
