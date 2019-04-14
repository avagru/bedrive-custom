import { WeeklyPageViews } from '../types/site-analytics-data';
import { timestampToDayName } from '../utils/timestamp-to-day-name';
import { ChartConfig, ChartType } from '../base-chart';

export function transformWeeklyData(weeklyData: WeeklyPageViews): ChartConfig {
    const config = {
        selector: '.weekly-chart',
        type: ChartType.LINE,
        labels: [],
        data: [[], []]
    };

    weeklyData.current.forEach((weekData, key) => {
        config.labels.push(timestampToDayName(weekData.date));

        // current week data
        config.data[0].push(weekData.pageViews);

        // previous week data
        config.data[1].push(weeklyData.previous[key].pageViews);
    });

    return config;
}
