import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {SubscriptionStepperState} from '../../subscriptions/subscription-stepper-state.service';
import { Plan } from '../../../shared/billing/models/plan';

@Component({
    selector: 'select-plan-period-panel',
    templateUrl: './select-plan-period-panel.component.html',
    styleUrls: ['./select-plan-period-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanPeriodPanelComponent {

    /**
     * Whether sidebar should be visible.
     */
    @Input() showSidebar = false;

    /**
     * Fired when user selects plan period.
     */
    @Output() selected = new EventEmitter();

    /**
     * SelectPlanPeriodPanelComponent Constructor.
     */
    constructor(public state: SubscriptionStepperState) {}

    /**
     * Get price decrease progress between specified plans.
     */
    public getPlanSavings(base: Plan, parent: Plan): number {
        const amount = this.getPlanPerMonthAmount(parent);
        const savings = (base.amount - amount) / base.amount * 100;
        return Math.ceil(savings);
    }

    public getPlanPerMonthAmount(plan: Plan) {
        return plan.amount / plan.interval_count;
    }
}
