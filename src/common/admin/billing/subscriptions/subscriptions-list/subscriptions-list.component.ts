import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {CrupdateSubscriptionModalComponent} from '../crupdate-subscription-modal/crupdate-subscription-modal.component';
import {UrlAwarePaginator} from '../../../pagination/url-aware-paginator.service';
import {Modal} from '../../../../core/ui/dialogs/modal.service';
import {Toast} from '../../../../core/ui/toast.service';
import {ConfirmModalComponent} from '../../../../core/ui/confirm-modal/confirm-modal.component';
import {PaginatedDataTableSource} from '../../../data-table/data/paginated-data-table-source';
import { CurrentUser } from '../../../../auth/current-user';
import { Subscription } from '../../../../shared/billing/models/subscription';
import { Subscriptions } from '../../../../shared/billing/subscriptions.service';

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubscriptionsListComponent implements OnInit {
    @ViewChild(MatPaginator) matPaginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: PaginatedDataTableSource<Subscription>;
    public loading = false;

    constructor(
        public paginator: UrlAwarePaginator,
        private subscriptions: Subscriptions,
        private modal: Modal,
        public currentUser: CurrentUser,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.dataSource = new PaginatedDataTableSource<Subscription>({
            uri: 'billing/subscriptions',
            dataPaginator: this.paginator,
            matPaginator: this.matPaginator,
            matSort: this.matSort,
        });

        this.dataSource.init();
    }

    /**
     * Ask user to confirm cancellation of subscription
     * and delete it if user confirms.
     */
    public maybeCancelSubscription(subscription: Subscription) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Cancel Subscription',
            body: 'Are you sure you want to cancel this subscription?',
            bodyBold: 'This will cancel or suspend subscription based on its gateway and put user on grace period until their next scheduled renewal date and allow them to renew the subscription.',
            ok: 'Cancel',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.cancelOrDeleteSubscription(subscription, {delete: false});
        });
    }

    /**
     * Ask user to confirm deletion of subscription
     * and delete it if user confirms.
     */
    public maybeDeleteSubscription(subscription: Subscription) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Delete Subscription',
            body: 'Are you sure you want to delete this subscription?',
            bodyBold: 'This will permanently delete user subscription and immediately cancel it on billing gateway.',
            ok: 'Delete',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.cancelOrDeleteSubscription(subscription, {delete: true});
        });
    }

    /**
     * Cancel specified subscription.
     */
    private cancelOrDeleteSubscription(subscription: Subscription, params: {delete?: boolean} = {}) {
        this.loading = true;

        this.subscriptions.cancel(subscription.id, {delete: params.delete})
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => {
                this.dataSource.refresh();
                this.toast.open('Subscription cancelled.');
            });
    }

    /**
     * Open modal for editing existing or creating a new subscription.
     */
    public openCrupdateSubscriptionModal(subscription?: Subscription) {
        this.modal.open(CrupdateSubscriptionModalComponent, {subscription})
            .afterClosed()
            .subscribe(newSubscription => {
                if ( ! newSubscription) return;
                this.dataSource.refresh();
            });
    }
}
