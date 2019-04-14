import {Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionListChange} from '@angular/material';
import {Role} from '../../../core/types/models/Role';
import {RoleService} from '../../roles/role.service';

export interface SelectRolesModalData {
    selected?: number[];
}

@Component({
    selector: 'select-roles-modal',
    templateUrl: './select-roles-modal.component.html',
    styleUrls: ['./select-roles-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectRolesModalComponent implements OnInit {

    /**
     * All existing roles.
     */
    public roles: Role[] = [];

    /**
     * Currently selected roles.
     */
    public selectedRoles: number[] = [];

    /**
     * Roles that should not be selectable.
     */
    public disabledRoles: number[] = [];

    /**
     * SelectRoleModalComponent Constructor.
     */
    constructor(
        private rolesService: RoleService,
        private dialogRef: MatDialogRef<SelectRolesModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SelectRolesModalData,
    ) {}

    public ngOnInit() {
        this.fetchAllRoles();
        this.disabledRoles = this.data.selected;
    }

    /**
     * Close modal and return selected roles to caller.
     */
    public confirm() {
        this.close(this.selectedRoles);
    }

    /**
     * Close the modal and pass specified data.
     */
    public close(data?) {
        this.dialogRef.close(data);
    }

    /**
     * Check if given role is currently selected.
     */
    public isRoleSelected(item: number) {
        return this.selectedRoles.indexOf(item) > -1;
    }

    /**
     * Should specified role be disabled (not selectable).
     */
    public isRoleDisabled(id: number) {
        return this.disabledRoles.indexOf(id) > -1;
    }

    /**
     * Selected or deselect specified role.
     */
    public toggleSelectedRole(change: MatSelectionListChange) {
        const roleId = change.option.value,
              index = this.selectedRoles.indexOf(roleId);

        if (index > -1) {
            this.selectedRoles.splice(index, 1);
        } else {
            this.selectedRoles.push(roleId);
        }
    }

    /**
     * Set all available roles on component,
     * if not provided fetch from the server.
     */
    private fetchAllRoles() {
        this.rolesService.getRoles()
            .subscribe(response => this.roles = response.data);
    }
}
