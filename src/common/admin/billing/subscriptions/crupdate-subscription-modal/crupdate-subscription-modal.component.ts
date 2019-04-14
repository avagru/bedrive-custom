import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Observable, Subject, of as observableOf} from 'rxjs';
import {User} from '../../../../core/types/models/User';
import {Toast} from '../../../../core/ui/toast.service';
import {Users} from '../../../../auth/users.service';
import { Subscription } from '../../../../shared/billing/models/subscription';
import { Plans } from '../../../../shared/billing/plans.service';
import { Subscriptions } from '../../../../shared/billing/subscriptions.service';
import { Plan } from '../../../../shared/billing/models/plan';

export interface CrupdateSubscriptionModalData {
    subscription?: Subscription;
}

@Component({
    selector: 'crupdate-subscription-modal',
    templateUrl: './crupdate-subscription-modal.component.html',
    styleUrls: ['./crupdate-subscription-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrupdateSubscriptionModalComponent implements OnInit {

    /**
     * Whether subscription is currently being saved.
     */
    public loading = false;

    /**
     * Subscription model.
     */
    public model: Subscription;

    /**
     * If we are updating existing subscription or creating a new one.
     */
    public updating = false;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    /**
     * Form control for user autocomplete input.
     */
    public userAutocomplete: FormControl = new FormControl(null);

    /**
     * Users returned from autocomplete query.
     */
    public filteredUsers: Observable<User[]> = new Subject();

    /**
     * All existing billing plans.
     */
    public plans: Plan[] = [];

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdateSubscriptionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateSubscriptionModalData,
        public subscriptions: Subscriptions,
        private toast: Toast,
        private users: Users,
        private plansApi: Plans,
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();
        this.bindToUserAutocomplete();
        this.fetchPlans();

        if (this.data.subscription) {
            this.updating = true;
            this.hydrateModel(this.data.subscription);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new subscription or update existing one.
     */
    public confirm() {
        this.loading = true;
        let request;

        if (this.updating) {
            request = this.subscriptions.update(this.data.subscription.id, this.getPayload());
        } else {
            request = this.subscriptions.create(this.getPayload());
        }

        request.subscribe(response => {
            this.close(response.subscription);
            const action = this.updating ? 'updated' : 'created';
            this.toast.open('Subscription has been ' + action);
            this.loading = false;
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    public displayFn(user?: User): string {
        return user ? user.email : null;
    }

    /**
     * Populate subscription model with given data.
     */
    private hydrateModel(subscription: Subscription) {
        this.model = Object.assign({}, subscription);

        if (this.model.renews_at) {
            this.model.renews_at = this.mysqlToDate(this.model.renews_at);
        }

        if (this.model.ends_at) {
            this.model.ends_at = this.mysqlToDate(this.model.ends_at);
        }

        if (subscription.user_id) {
            this.userAutocomplete.setValue(subscription.user);
        }
    }

    /**
     * Get request payload for backend.
     */
    private getPayload() {
        const payload = {
            plan_id: this.model.plan_id,
            description: this.model.description,
        } as Partial<Subscription>;

        const renewsAt = this.dateToMysql(this.model.renews_at as any),
            endsAt = this.dateToMysql(this.model.ends_at as any);

        if (renewsAt) payload.renews_at = renewsAt as any;
        if (endsAt) payload.ends_at = endsAt as any;

        // if we are creating a new subscription, start user ID to payload
        if ( ! this.updating && this.userAutocomplete.value) {
            payload['user_id'] = this.userAutocomplete.value.id;
        }

        return payload;
    }

    /**
     * Format js date instance into mysql timestamp format.
     */
    private dateToMysql(date: string|Date) {
        if ( ! date || typeof date === 'string') return date;
        return date.toJSON().split('.')[0].replace('T', ' ');
    }

    private mysqlToDate(date: string): any {
        const t = date.split(/[- :]/) as any[];
        return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Subscription();
        this.errors = {};
    }

    /**
     * Toggle specified date picker's state between open and closed.
     */
    public toggleDatePicker(datePicker: MatDatepicker<Date>) {
        if (datePicker.opened) {
            datePicker.close();
        } else {
            datePicker.open();
        }
    }

    /**
     * Suggest matching users when autocomplete form control's value changes.
     */
    private bindToUserAutocomplete() {
        this.filteredUsers = this.userAutocomplete.valueChanges.pipe(
            debounceTime(400),
            switchMap(query => {
                if ( ! query) return observableOf([]);
                return this.users.getAll({query});
            })
        );
    }

    /**
     * Fetch all existing billing plans.
     */
    private fetchPlans() {
        this.plansApi.all().subscribe(response => {
           this.plans = response.data;

           // select first plan, if none is selected yet
           if ( ! this.model.plan_id) {
               this.model.plan_id = this.plans[0].id;
           }
        });
    }
}
