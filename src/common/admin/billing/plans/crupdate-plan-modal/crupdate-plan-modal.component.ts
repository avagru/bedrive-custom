import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Plan} from '../../../../core/types/models/Plan';
import {Toast} from '../../../../core/ui/toast.service';
import {Currency, ValueLists} from '../../../../core/services/value-lists.service';
import {randomString} from '../../../../core/utils/random-string';
import { Plans } from '../../../../shared/billing/plans.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface CrupdatePlanModalData {
    plan?: Plan;
    plans: Plan[];
}

@Component({
    selector: 'crupdate-plan-modal',
    templateUrl: './crupdate-plan-modal.component.html',
    styleUrls: ['./crupdate-plan-modal.component.scss'],
    providers: [Plans],
    encapsulation: ViewEncapsulation.None
})
export class CrupdatePlanModalComponent implements OnInit {
    public loading = false;
    public model: Plan;
    public updating = false;
    public newFeature: string;
    public features: {content: string, id: string}[] = [];
    public errors: any = {};
    public currencies: Currency[] = [];
    public intervals = ['day', 'week', 'month', 'year'];

    /**
     * All existing plans.
     */
    private allPlans: Plan[] = [];

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdatePlanModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatePlanModalData,
        public plans: Plans,
        private toast: Toast,
        private valueLists: ValueLists,
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();
        this.allPlans = this.data.plans || [];

        this.valueLists.get(['currencies']).subscribe(response => {
            this.currencies = Object.keys(response.currencies).map(key => {
                return response.currencies[key];
            });
        });

        if (this.data.plan) {
            this.updating = true;
            this.hydrateModel(this.data.plan);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new plan or update existing one.
     */
    public confirm() {
        this.loading = true;
        let request;

        if (this.updating) {
            request = this.plans.update(this.data.plan.id, this.getPayload());
        } else {
            request = this.plans.create(this.getPayload());
        }

        request.subscribe(response => {
            this.close(response.plan);
            const action = this.updating ? 'updated' : 'created';
            this.toast.open('Plan has been ' + action);
            this.loading = false;
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    public getPayload() {
        const payload = Object.assign({}, this.model);
        payload.features = this.features.map(feature => feature.content);

        const currency = this.currencies.find(curr => curr.code === payload.currency);
        payload.currency_symbol = currency.symbol;

        return payload;
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    /**
     * Add new feature to plan.
     */
    public addFeature() {
        const exists = this.features.findIndex(curr => curr.content === this.newFeature) > -1;
        if (exists || ! this.newFeature) return;
        this.features.push({content: this.newFeature, id: randomString(5)});
        this.newFeature = null;
    }

    /**
     * Remove specified feature from plan.
     */
    public removeFeature(feature: {content: string, id: string}) {
        const i = this.features.findIndex(curr => curr.id === feature.id);
        this.features.splice(i, 1);
    }

    /**
     * Get all base plans.
     */
    public getBasePlans(): Plan[] {
        return this.allPlans.filter(plan => !plan.parent_id && !plan.free);
    }

    /**
     * Populate plan model with given data.
     */
    private hydrateModel(plan: Plan) {
        this.model = Object.assign(plan);
        this.features = plan.features.map(feature => {
            return {content: feature, id: randomString(5)};
        });
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Plan({currency: 'USD', interval: 'month', interval_count: 1, position: 1});
        this.features = [];
        this.errors = {};
    }

    public reorderPlanFeatures(e: CdkDragDrop<void>) {
        moveItemInArray(this.features, e.previousIndex, e.currentIndex);
    }
}
