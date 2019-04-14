import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule, MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
} from '@angular/material';
import {UpgradePageComponent} from './upgrade-page/upgrade-page.component';
import {BillingPlansResolver} from './upgrade-page/billing-plans-resolver.service';
import {BillingRoutingModule} from './billing-routing.module';
import { PlanFeaturesListComponent } from './upgrade-page/plan-features-list/plan-features-list.component';
import { OrderSummaryComponent } from './upgrade-page/order-summary/order-summary.component';
import { AcceptedPaymentsHeaderComponent } from './upgrade-page/accepted-payments-header/accepted-payments-header.component';
import { UserSubscriptionPageComponent } from './subscriptions/user-subscription-page/user-subscription-page.component';
import { UpgradePageAsideComponent } from './upgrade-page/upgrade-page-aside/upgrade-page-aside.component';
import {CurrenciesListResolver} from './upgrade-page/currencies-list-resolver.service';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import {PaypalSubscriptions} from './subscriptions/paypal-subscriptions';
import { SelectPlanModalComponent } from './plans/select-plan-modal/select-plan-modal.component';
import {SelectPlanPanelComponent} from './plans/select-plan-panel/select-plan-panel.component';
import {SelectPlanPeriodPanelComponent} from './plans/select-plan-period-panel/select-plan-period-panel.component';
import {SubscriptionStepperState} from './subscriptions/subscription-stepper-state.service';
import {UserNotSubscribedGuard} from './guards/user-not-subscribed-guard.service';
import {UserSubscribedGuard} from './guards/user-subscribed-guard.service';
import {CreateSubscriptionPanelComponent} from './subscriptions/create-subscription-panel/create-subscription-panel.component';
import {UiModule} from '../core/ui/ui.module';
import { ContactWidgetComponent } from './upgrade-page/contact-widget/contact-widget.component';
import { FullPlanNameModule } from '../shared/billing/full-plan-name/full-plan-name.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        BillingRoutingModule,
        FullPlanNameModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatListModule,
        MatStepperModule,
        MatProgressBarModule,
        MatTabsModule,
        MatRadioModule,
    ],
    declarations: [
        UpgradePageComponent,
        PlanFeaturesListComponent,
        OrderSummaryComponent,
        AcceptedPaymentsHeaderComponent,
        UserSubscriptionPageComponent,
        UpgradePageAsideComponent,
        CreditCardFormComponent,
        CreateSubscriptionPanelComponent,
        SelectPlanPanelComponent,
        SelectPlanModalComponent,
        SelectPlanPeriodPanelComponent,
        ContactWidgetComponent,
    ],
    entryComponents: [
        SelectPlanModalComponent,
    ],
    providers: [
        BillingPlansResolver,
        CurrenciesListResolver,
        PaypalSubscriptions,
        SubscriptionStepperState,
        UserNotSubscribedGuard,
        UserSubscribedGuard,
    ],
    exports: [
        BillingRoutingModule,
    ]
})
export class BillingModule {
}
