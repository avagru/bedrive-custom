import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatStepper} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionStepperState} from '../subscriptions/subscription-stepper-state.service';
import {Settings} from '../../core/config/settings.service';
import {Toast} from '../../core/ui/toast.service';
import { Subscriptions } from '../../shared/billing/subscriptions.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface CreditCard {
    number?: number|string;
    expiration_month?: number|string;
    expiration_year?: number|string;
    security_code?: number|string;
}

@Component({
    selector: 'upgrade-page',
    templateUrl: './upgrade-page.component.html',
    styleUrls: ['./upgrade-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SubscriptionStepperState],
})
export class UpgradePageComponent implements OnInit {
    @ViewChild(MatStepper) stepper: MatStepper;
    public loading = false;

    constructor(
        private subscriptions: Subscriptions,
        private route: ActivatedRoute,
        public settings: Settings,
        private router: Router,
        private toast: Toast,
        public state: SubscriptionStepperState,
        public sanitizer: DomSanitizer,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.state.setPlans(data.plans);
        });
    }

    /**
     * Move to next "upgrade" stepper step.
     */
    public nextStep() {
        this.stepper.next();
    }

    /**
     * Fired when user subscribed to one of the plans successfully.
     */
    public onCompleted() {
        this.loading = false;
        this.router.navigate(['/drive']);
        this.toast.open({
            message: 'Subscribed to ":planName" plan successfully.',
            replacements: {planName: this.getSelectedOrParentPlanName()},
        });
    }

    public getBackground() {
        return this.sanitizer.bypassSecurityTrustStyle(
            `url(${this.settings.getAssetUrl('images/pricing-plans-bg.svg')})`
        );
    }

    /**
     * Get name of selected plan or it's parent.
     */
    private getSelectedOrParentPlanName(): string {
        const plan = this.state.selectedPlan.parent ? this.state.selectedPlan.parent : this.state.selectedPlan;
        return plan.name;
    }
}