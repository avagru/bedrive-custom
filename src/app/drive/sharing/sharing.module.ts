import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingPermissionsButtonComponent } from './sharing-permissions-button/sharing-permissions-button.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { EntriesAccessTableComponent } from './entries-access-table/entries-access-table.component';
import {
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatMenuModule, MatSlideToggleModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { ChipInputModule } from 'common/core/ui/chip-input/chip-input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LinkOptionsComponent } from './links/link-options/link-options.component';
import { UiModule } from 'common/core/ui/ui.module';
import { ShareLinkDialogComponent } from './share-link-dialog/share-link-dialog.component';
import { NoSharedEntriesComponent } from './no-shared-entries/no-shared-entries.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,

        // material
        MatSlideToggleModule,
        MatTabsModule,
        MatDialogModule,
        ChipInputModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
    ],
    declarations: [
        ShareDialogComponent,
        EntriesAccessTableComponent,
        SharingPermissionsButtonComponent,
        LinkOptionsComponent,
        ShareLinkDialogComponent,
        NoSharedEntriesComponent,
    ],
    entryComponents: [
        ShareDialogComponent,
        ShareLinkDialogComponent,
    ],
    exports: [
        NoSharedEntriesComponent,
    ]
})
export class SharingModule {
}
