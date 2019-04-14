import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionListChange} from '@angular/material';

export interface SelectPermissionsModalData {
    allPermissions: object;
}

@Component({
    selector: 'select-permissions-modal',
    templateUrl: './select-permissions-modal.component.html',
    styleUrls: ['./select-permissions-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectPermissionsModalComponent {
    public selectedPermissions: string[] = [];
    public disabledPermissions: string[] = [];

    constructor(
        private dialogRef: MatDialogRef<SelectPermissionsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SelectPermissionsModalData,
    ) {}

    public confirm() {
        this.close(this.selectedPermissions);
    }

    public close(data?) {
        this.dialogRef.close(data);
    }

    public isPermissionSelected(item: string) {
        return this.selectedPermissions.indexOf(item) > -1;
    }

    public isPermissionDisabled(id: string) {
        return this.disabledPermissions.indexOf(id) > -1;
    }

    public toggleSelectedPermission(change: MatSelectionListChange) {
        const permission = change.option.value,
              index = this.selectedPermissions.indexOf(permission);

        if (index > -1) {
            this.selectedPermissions.splice(index, 1);
        } else {
            this.selectedPermissions.push(permission);
        }
    }
}
