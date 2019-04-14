import { MonthlyPageViews } from '../types/site-analytics-data';
import { ChartConfig, ChartType } from '../base-chart';

export function transformMonthlyData(monthlyData: MonthlyPageViews): ChartConfig {
    const config = {
        selector: '.monthly-chart',
        type: ChartType.LINE,
        labels: [],
        data: [[], []]
    };

    monthlyData.current.forEach((monthData, key) => {
        config.labels.push(key);

        // current month data
        config.data[0].push(monthData.pageViews);

        // previous month data
        const prevDay = monthlyData.previous[key];
        config.data[1].push(prevDay ? prevDay.pageViews : 0);
    });

    return config;
}
