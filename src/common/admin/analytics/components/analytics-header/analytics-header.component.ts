import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnalyticsHeaderData } from '../../types/analytics-response';

@Component({
    selector: 'analytics-header',
    templateUrl: './analytics-header.component.html',
    styleUrls: ['./analytics-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsHeaderComponent {
    @Input() data: AnalyticsHeaderData;
}
