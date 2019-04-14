import {Route} from '@angular/router';
import {AuthenticationSettingsComponent} from './authentication/authentication-settings.component';
import {CacheSettingsComponent} from './cache/cache-settings.component';
import {PermissionsSettingsComponent} from './permissions/permissions-settings.component';
import {AnalyticsSettingsComponent} from './analytics/analytics-settings.component';
import {LocalizationSettingsComponent} from './localization/localization-settings.component';
import {MailSettingsComponent} from './mail/mail-settings.component';
import {LoggingSettingsComponent} from './logging/logging-settings.component';
import {QueueSettingsComponent} from './queue/queue-settings.component';
import {GeneralSettingsComponent} from './general/general-settings.component';
import {LocalizationsResolve} from '../translations/localizations-resolve.service';
import {BillingSettingsComponent} from './billing/billing-settings.component';
import { UploadingSettingsComponent } from './uploading/uploading-settings.component';
import { RecaptchaSettingsComponent } from './recaptcha/recaptcha-settings.component';

export const vebtoSettingsRoutes: Route[] = [
    {path: '', redirectTo: 'general', pathMatch: 'full'},
    {path: 'general', component: GeneralSettingsComponent, pathMatch: 'full'},
    {path: 'authentication', component: AuthenticationSettingsComponent},
    {path: 'cache', component: CacheSettingsComponent},
    {path: 'permissions', component: PermissionsSettingsComponent},
    {path: 'analytics', component: AnalyticsSettingsComponent},
    {path: 'localization', component: LocalizationSettingsComponent,  resolve: {localizations: LocalizationsResolve}},
    {path: 'mail', component: MailSettingsComponent},
    {path: 'logging', component: LoggingSettingsComponent},
    {path: 'queue', component: QueueSettingsComponent},
    {path: 'billing', component: BillingSettingsComponent},
    {path: 'uploading', component: UploadingSettingsComponent},
    {path: 'recaptcha', component: RecaptchaSettingsComponent},
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })
// export class SettingsRoutingModule {}