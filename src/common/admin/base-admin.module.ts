import {NgModule} from '@angular/core';
import {AssignUsersToRoleModalComponent} from './roles/assign-users-to-role-modal/assign-users-to-role-modal.component';
import {CrupdateRoleModalComponent} from './roles/crupdate-role-modal/crupdate-role-modal.component';
import {UsersComponent} from './users/users.component';
import {AdminComponent} from './admin.component';
import {CrupdateUserModalComponent} from './users/crupdate-user-modal/crupdate-user-modal.component';
import {RolesComponent} from './roles/roles.component';
import {PagesComponent} from './pages/pages.component';
import {CrupdatePageComponent} from './pages/crupdate-page/crupdate-page.component';
import {TranslationsComponent} from './translations/translations.component';
import {CrupdateLocalizationModalComponent} from './translations/crupdate-localization-modal/crupdate-localization-modal.component';
import {MailTemplatesComponent} from './mail-templates/mail-templates.component';
import {MailTemplatePreviewComponent} from './mail-templates/mail-template-preview/mail-template-preview.component';
import {UserAccessManagerComponent} from './users/user-access-manager/user-access-manager.component';
import {SelectRolesModalComponent} from './users/select-roles-modal/select-roles-modal.component';
import {AppearanceModule} from './appearance/appearance.module';
import {AdsPageComponent} from './ads-page/ads-page.component';
import {SettingsModule} from './settings/settings.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UiModule} from '../core/ui/ui.module';
import {AuthModule} from '../auth/auth.module';
import {TextEditorModule} from '../text-editor/text-editor.module';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSidenavModule, MatNativeDateModule,
} from '@angular/material';
import {SelectPermissionsModalComponent} from './permissions/select-permissions-modal/select-permissions-modal.component';
import {PermissionsManagerPanelComponent} from './permissions/permissions-manager-panel/permissions-manager-panel.component';
import {CrupdatePlanModalComponent} from './billing/plans/crupdate-plan-modal/crupdate-plan-modal.component';
import {CrupdateSubscriptionModalComponent} from './billing/subscriptions/crupdate-subscription-modal/crupdate-subscription-modal.component';
import {SubscriptionsListComponent} from './billing/subscriptions/subscriptions-list/subscriptions-list.component';
import {PlansListComponent} from './billing/plans/plans-list/plans-list.component';
import {DataTableComponent} from './data-table/data-table.component';
import {SpaceInputModule} from '../core/ui/space-input/space-input.module';
import {DEFAULT_VEBTO_ADMIN_CONFIG} from './vebto-admin-config';
import {Settings} from '../core/config/settings.service';
import {FullPlanNameModule} from '../shared/billing/full-plan-name/full-plan-name.module';
import {FileEntriesPageComponent} from './file-entries-page/file-entries-page.component';
import {NewLineModalComponent} from './translations/new-line-modal/new-line-modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextEditorModule,
        AppearanceModule,
        SettingsModule,
        UiModule,
        AuthModule,
        FullPlanNameModule,
        SpaceInputModule,

        // material
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatListModule,
        MatExpansionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSidenavModule,
        DragDropModule,
    ],
    declarations: [
        AdminComponent,
        RolesComponent,
        CrupdateRoleModalComponent,
        AssignUsersToRoleModalComponent,
        UsersComponent,
        CrupdateUserModalComponent,
        TranslationsComponent,
        CrupdateLocalizationModalComponent,
        NewLineModalComponent,
        PagesComponent,
        CrupdatePageComponent,
        MailTemplatesComponent,
        MailTemplatePreviewComponent,
        UserAccessManagerComponent,
        SelectRolesModalComponent,
        SelectPermissionsModalComponent,
        PermissionsManagerPanelComponent,
        AdsPageComponent,
        FileEntriesPageComponent,

        // billing
        PlansListComponent,
        SubscriptionsListComponent,
        CrupdatePlanModalComponent,
        CrupdateSubscriptionModalComponent,
        DataTableComponent,
    ],
    entryComponents: [
        CrupdateUserModalComponent,
        CrupdateRoleModalComponent,
        AssignUsersToRoleModalComponent,
        CrupdateLocalizationModalComponent,
        NewLineModalComponent,
        SelectRolesModalComponent,
        SelectPermissionsModalComponent,
        PermissionsManagerPanelComponent,

        // billing
        CrupdatePlanModalComponent,
        CrupdateSubscriptionModalComponent,
    ],
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextEditorModule,
        AppearanceModule,
        SettingsModule,
        UiModule,
        AuthModule,
        PermissionsManagerPanelComponent,
        SelectPermissionsModalComponent,
        DataTableComponent,

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
        MatChipsModule,
        DragDropModule,
    ]
})
export class BaseAdminModule {
    constructor(private settings: Settings) {
        this.settings.merge({vebto: DEFAULT_VEBTO_ADMIN_CONFIG});
    }
}
