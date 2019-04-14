import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { DRIVE_ENTRY_FULL_PERMISSIONS, DriveEntryPermissions } from '../../permissions/drive-entry-permissions';
import { ShareDialogEntryPermissions } from '../share-dialog/types/ShareDialogEntryPermissions';

@Component({
    selector: 'sharing-permissions-button',
    templateUrl: './sharing-permissions-button.component.html',
    styleUrls: ['./sharing-permissions-button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharingPermissionsButtonComponent {
    @Input() permissions: ShareDialogEntryPermissions = DRIVE_ENTRY_FULL_PERMISSIONS;
    @Output() change: EventEmitter<DriveEntryPermissions> = new EventEmitter();
    @Input() @HostBinding('class.compact') compact = false;

    public overallPermission(): keyof ShareDialogEntryPermissions {
        if (this.permissions.varies) {
            return 'varies';
        } else if (this.permissions.edit) {
            return 'edit';
        } else if (this.permissions.download) {
            return 'download';
        } {
            return 'view';
        }
    }

    public selectPermission(permission: keyof ShareDialogEntryPermissions) {
        if (permission === 'edit') {
            this.permissions = {...DRIVE_ENTRY_FULL_PERMISSIONS};
        } else if (permission === 'download') {
            this.permissions = {...DRIVE_ENTRY_FULL_PERMISSIONS, edit: false};
        } else {
            this.permissions = {...DRIVE_ENTRY_FULL_PERMISSIONS, edit: false, download: false};
        }

        this.change.emit(this.permissions);
    }
}
