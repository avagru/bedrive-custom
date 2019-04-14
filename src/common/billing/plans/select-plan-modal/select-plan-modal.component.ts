import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatHorizontalStepper, MatStepper} from '@angular/material';
import {SubscriptionStepperState} from '../../subscriptions/subscription-stepper-state.service';
import {ConfirmModalComponent} from '../../../core/ui/confirm-modal/confirm-modal.component';
import { Plan } from '../../../shared/billing/models/plan';

export interface SelectPlanModalData {
    plans: Plan[];
}

@Component({
    selector: 'select-plan-modal',
    templateUrl: './select-plan-modal.component.html',
    styleUrls: ['./select-plan-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SubscriptionStepperState],
})
export class SelectPlanModalComponent implements OnInit {
    @ViewChild(MatHorizontalStepper) stepper: MatStepper;

    constructor(
        private dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SelectPlanModalData,
        public state: SubscriptionStepperState,
    ) {}

    ngOnInit() {
        this.state.setPlans(this.data.plans);
    }

    /**
     * Close the modal.
     */
    public close() {
        this.dialogRef.close(this.state.selectedPlan);
    }

    /**
     * Move to next "select plan" stepper step.
     */
    public nextStep() {
        this.stepper.next();
    }
}
