import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Plan } from '../../../shared/billing/models/plan';

@Component({
    selector: 'plan-features-list',
    templateUrl: './plan-features-list.component.html',
    styleUrls: ['./plan-features-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlanFeaturesListComponent {
    @Input() plan: Plan;

    /**
     * Whether "check" icon should be shown next to plan feature.
     */
    @Input() showCheckIcons = false;

    /**
     * Whether features list should be displayed as dense.
     */
    @Input() dense = false;

    public getPlan() {
        return this.plan.parent || this.plan;
    }
}
