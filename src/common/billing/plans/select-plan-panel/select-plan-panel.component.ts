import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { SubscriptionStepperState } from '../../subscriptions/subscription-stepper-state.service';
import { Plan } from '../../../shared/billing/models/plan';
import { Settings } from '../../../core/config/settings.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'select-plan-panel',
    templateUrl: './select-plan-panel.component.html',
    styleUrls: ['./select-plan-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectPlanPanelComponent implements OnInit {

    /**
     * Whether any of the billing plans are marked as "recommended"
     */
    public hasRecommendedPlan = false;

    /**
     * Fired when user selects a plan.
     */
    @Output() selected = new EventEmitter();

    constructor(
        public state: SubscriptionStepperState,
    ) {}

    ngOnInit() {
        this.hasRecommendedPlan = this.state.plans.filter(plan => plan.recommended).length > 0;
    }

    /**
     * Select specified plan and fire "selected" event.
     */
    public selectPlan(plan: Plan) {
        this.state.selectInitialPlan(plan);
        // fire event on next render to avoid race conditions
        setTimeout(() => this.selected.emit(plan));
    }

    /**
     * Get all plan that are not children and not free.
     */
    public getAllPlans() {
        return this.state.plans.filter(plan => !plan.free && !plan.parent_id);
    }
}
