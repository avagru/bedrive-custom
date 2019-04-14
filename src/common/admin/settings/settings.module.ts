import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {SettingsPanelComponent} from './settings-panel.component';
import {AuthenticationSettingsComponent} from './authentication/authentication-settings.component';
import {CacheSettingsComponent} from './cache/cache-settings.component';
import {PermissionsSettingsComponent} from './permissions/permissions-settings.component';
import {AnalyticsSettingsComponent} from './analytics/analytics-settings.component';
import {LocalizationSettingsComponent} from './localization/localization-settings.component';
import {MailSettingsComponent} from './mail/mail-settings.component';
import {LoggingSettingsComponent} from './logging/logging-settings.component';
import {QueueSettingsComponent} from './queue/queue-settings.component';
import {SettingsResolve} from './settings-resolve.service';
import {SettingsState} from './settings-state.service';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GeneralSettingsComponent} from './general/general-settings.component';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatMenuModule, MatPaginatorModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTooltipModule, MatChipsModule, MatProgressBarModule
} from '@angular/material';
import {UiModule} from '../../core/ui/ui.module';
import {BillingSettingsComponent} from './billing/billing-settings.component';
import { SpaceInputModule } from '../../core/ui/space-input/space-input.module';
import { UploadingSettingsComponent } from './uploading/uploading-settings.component';
import { ChipInputModule } from '../../core/ui/chip-input/chip-input.module';
import { FtpFormComponent } from './uploading/storage-forms/ftp-form/ftp-form.component';
import { DropboxFormComponent } from './uploading/storage-forms/dropbox-form/dropbox-form.component';
import { RackspaceFormComponent } from './uploading/storage-forms/rackspace-form/rackspace-form.component';
import { S3FormComponent } from './uploading/storage-forms/s3-form/s3-form.component';
import { DigitaloceanFormComponent } from './uploading/storage-forms/digitalocean-form/digitalocean-form.component';
import { RecaptchaSettingsComponent } from './recaptcha/recaptcha-settings.component';
import { BackblazeFormComponent } from './uploading/storage-forms/backblaze-form/backblaze-form.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        SpaceInputModule,
        ChipInputModule,

        // material
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatChipsModule,
        MatProgressBarModule,
    ],
    declarations: [
        SettingsComponent,
        SettingsPanelComponent,
        AuthenticationSettingsComponent,
        CacheSettingsComponent,
        PermissionsSettingsComponent,
        AnalyticsSettingsComponent,
        LocalizationSettingsComponent,
        MailSettingsComponent,
        LoggingSettingsComponent,
        QueueSettingsComponent,
        GeneralSettingsComponent,
        BillingSettingsComponent,
        RecaptchaSettingsComponent,

        // uploading
        UploadingSettingsComponent,
        FtpFormComponent,
        DropboxFormComponent,
        RackspaceFormComponent,
        S3FormComponent,
        DigitaloceanFormComponent,
        BackblazeFormComponent,
    ],
    providers: [
        SettingsResolve,
        SettingsState,
    ],
    exports: [
        ChipInputModule,
    ]
})
export class SettingsModule {
}
