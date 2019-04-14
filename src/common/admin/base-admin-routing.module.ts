import {Routes} from '@angular/router';
import {RolesComponent} from './roles/roles.component';
import {UsersComponent} from './users/users.component';
import {PagesComponent} from './pages/pages.component';
import {CrupdatePageComponent} from './pages/crupdate-page/crupdate-page.component';
import {TranslationsComponent} from './translations/translations.component';
import {LocalizationsResolve} from './translations/localizations-resolve.service';
import {MailTemplatesComponent} from './mail-templates/mail-templates.component';
import {MailTemplatesResolve} from './mail-templates/mail-templates-resolve.service';
import {AdsPageComponent} from './ads-page/ads-page.component';
import {SubscriptionsListComponent} from './billing/subscriptions/subscriptions-list/subscriptions-list.component';
import {PlansListComponent} from './billing/plans/plans-list/plans-list.component';
import {AuthGuard} from '../guards/auth-guard.service';
import { FileEntriesPageComponent } from './file-entries-page/file-entries-page.component';
import {BillingEnabledGuard} from '../shared/billing/guards/billing-enabled-guard.service';

export const vebtoAdminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
    },
    {
        path: 'analytics',
        loadChildren: 'common/admin/analytics/analytics.module#AnalyticsModule',
        canActivate: [AuthGuard],
        data: {permissions: ['reports.view']}
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {permissions: ['users.view']}
    },
    {
        path: 'roles',
        component: RolesComponent,
        data: {permissions: ['roles.view']}
    },
    {
        path: 'translations',
        component: TranslationsComponent,
        resolve: {localizations: LocalizationsResolve},
        data: {permissions: ['localizations.view']}
    },
    {
        path: 'mail-templates',
        component: MailTemplatesComponent,
        resolve: {templates: MailTemplatesResolve},
        data: {permissions: ['mail_templates.view']}
    },
    {
        path: 'pages',
        component: PagesComponent,
        data: {permissions: ['pages.view']}
    },
    {
        path: 'files',
        component: FileEntriesPageComponent,
        data: {permissions: ['files.view']}
    },
    {
        path: 'pages/new',
        component: CrupdatePageComponent,
        data: {permissions: ['pages.create']}
    },
    {
        path: 'pages/:id/edit',
        component: CrupdatePageComponent,
        data: {permissions: ['pages.update']}
    },
    {
        path: 'ads',
        component: AdsPageComponent,
        data: {permissions: ['ads.update']}
    },

    // billing
    {
        path: 'plans',
        component: PlansListComponent,
        canActivate: [BillingEnabledGuard],
        data: {permissions: ['plans.view']}
    },

    {
        path: 'subscriptions',
        component: SubscriptionsListComponent,
        canActivate: [BillingEnabledGuard],
        data: {permissions: ['subscriptions.view']}
    },
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })
// export class AdminRoutingModule {
// }