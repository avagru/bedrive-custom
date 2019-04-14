import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsContainerComponent } from './components/analytics-container/analytics-container.component';
import { ChartComponent } from './components/chart/chart.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { UiModule } from '../../core/ui/ui.module';
import { AnalyticsRoutingRoutingModule } from './analytics-routing-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        AnalyticsRoutingRoutingModule,
    ],
    declarations: [
        AnalyticsContainerComponent,
        AnalyticsHeaderComponent,
        ChartComponent,
    ]
})
export class AnalyticsModule {
}
